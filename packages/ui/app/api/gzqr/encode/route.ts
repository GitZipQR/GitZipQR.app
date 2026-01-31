import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { execFileP, hasCmd, makeTempDir, resolveBin, runStreaming, writeUploads } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const files = form.getAll("files").filter(Boolean) as File[];
  const paths = form.getAll("paths").map((p) => String(p || ""));
  const pass = String(form.get("pass") || "");
  const passFile = form.get("passFile") as File | null;
  const makePdf = String(form.get("makePdf") || "") === "1";
  const outName = String(form.get("outName") || "qrcodes").trim() || "qrcodes";

  if (!files.length) return new Response("No input files", { status: 400 });

  const workDir = await makeTempDir();
  try {
    const { inputPath } = await writeUploads(files, paths, workDir);
    const outDir = path.join(workDir, "qrcodes");
    await fsp.mkdir(outDir, { recursive: true });

    let passText = pass;
    if (!passText && passFile) passText = await passFile.text();
    const env = { ...process.env, ...(passText ? { GZQR_PASS: passText } : {}) };

    const enc = resolveBin("encode");
    const code = await runStreaming(enc, [inputPath, outDir], { env });
    if (code !== 0) return new Response(`encode exit ${code}`, { status: 500 });

    let outPath = "";
    let kind = "zip";
    if (makePdf) {
      try {
        const PDFDocument = (await import("pdfkit")).default;
        const sharp = (await import("sharp")).default;
        const filesPng = fs.readdirSync(outDir).filter(f => f.endsWith(".png")).sort();
        if (filesPng.length) {
          const pdfOut = path.join(workDir, `${outName}.pdf`);
          const doc = new PDFDocument({ size: "A4", margin: 18 });
          const ws = fs.createWriteStream(pdfOut); doc.pipe(ws);
          const cols = 3, rows = 3;
          const pageW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
          const pageH = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;
          const cellW = Math.floor(pageW / cols), cellH = Math.floor(pageH / rows);
          let i = 0;
          for (const f of filesPng) {
            if (i > 0 && i % (cols * rows) === 0) doc.addPage();
            const x = (i % cols) * cellW + doc.page.margins.left;
            const y = Math.floor(i / cols) % rows * cellH + doc.page.margins.top;
            const img = await sharp(path.join(outDir, f)).resize(cellW - 8, cellH - 28, { fit: "contain" }).png().toBuffer();
            doc.image(img, x + 4, y + 12);
            doc.fontSize(8).fillColor("#333").text(String(i + 1).padStart(6, "0"), x + 4, y + 2, { width: cellW - 8, align: "center" });
            i++;
          }
          doc.end();
          await new Promise<void>((res) => ws.on("close", () => res()));
          outPath = pdfOut;
          kind = "pdf";
        }
      } catch {
        // fall back to zip
      }
    }

    if (!outPath) {
      if (!hasCmd("zip")) return new Response("zip not available", { status: 500 });
      outPath = path.join(workDir, `${outName}.zip`);
      await execFileP("zip", ["-qr", outPath, "."], { cwd: outDir });
      kind = "zip";
    }

    const buf = await fsp.readFile(outPath);
    const headers = new Headers();
    headers.set("content-type", kind === "pdf" ? "application/pdf" : "application/zip");
    headers.set("content-disposition", `attachment; filename="${path.basename(outPath)}"`);
    headers.set("x-gzqr-kind", kind);
    headers.set("x-gzqr-filename", path.basename(outPath));
    return new Response(buf, { headers });
  } catch (e: any) {
    return new Response(String(e?.message || e), { status: 500 });
  } finally {
    await fsp.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}
