import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { execFileP, hasCmd, makeTempDir, resolveBin, runStreaming, sanitizeRel, writeUploads } from "../_lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const files = form.getAll("files").filter(Boolean) as File[];
  const paths = form.getAll("paths").map((p) => String(p || ""));
  const pass = String(form.get("pass") || "");
  const passFile = form.get("passFile") as File | null;

  if (!files.length) return new Response("No input files", { status: 400 });

  const workDir = await makeTempDir();
  try {
    const { inputDir } = await writeUploads(files, paths, workDir);

    let passText = pass;
    if (!passText && passFile) passText = await passFile.text();
    const env = { ...process.env, ...(passText ? { GZQR_PASS: passText } : {}) };

    let pngDir = inputDir;
    const pdfIndex = files.findIndex(f => String(f.name || "").toLowerCase().endsWith(".pdf"));
    if (pdfIndex >= 0) {
      const pdfRel = sanitizeRel(paths[pdfIndex] || files[pdfIndex].name);
      const pdfPath = path.join(inputDir, pdfRel);
      const outPng = path.join(workDir, "pngs");
      await fsp.mkdir(outPng, { recursive: true });
      if (hasCmd("pdftoppm")) {
        await execFileP("pdftoppm", [pdfPath, path.join(outPng, "page"), "-png", "-r", "300"]);
      } else if (hasCmd("gs")) {
        await execFileP("gs", ["-dSAFER", "-dBATCH", "-dNOPAUSE", "-sDEVICE=png16m", "-r300", "-sOutputFile=" + path.join(outPng, "page-%04d.png"), pdfPath]);
      } else {
        return new Response("No PDF converter found (pdftoppm/gs)", { status: 500 });
      }
      pngDir = outPng;
    }

    const outDir = path.join(workDir, "out");
    await fsp.mkdir(outDir, { recursive: true });
    const dec = resolveBin("decode");
    const code = await runStreaming(dec, [pngDir, outDir], { env });
    if (code !== 0) return new Response(`decode exit ${code}`, { status: 500 });

    const outFiles = fs.readdirSync(outDir).filter(f => !f.startsWith(".") && !f.endsWith(".tar"));
    let outPath = "";
    let kind: "file" | "tar" | "zip" = "file";
    if (outFiles.length === 1) {
      const only = path.join(outDir, outFiles[0]);
      if (fs.statSync(only).isFile()) outPath = only;
    }
    if (!outPath) {
      if (hasCmd("tar")) {
        outPath = path.join(workDir, "restored.tar");
        await execFileP("tar", ["-cf", outPath, "-C", outDir, ".", "--exclude=*.tar"]);
        kind = "tar";
      } else if (hasCmd("zip")) {
        outPath = path.join(workDir, "restored.zip");
        await execFileP("zip", ["-qr", outPath, "."], { cwd: outDir });
        kind = "zip";
      } else {
        return new Response("No archiver found (tar/zip)", { status: 500 });
      }
    }

    const buf = await fsp.readFile(outPath);
    const headers = new Headers();
    const ctype = kind === "tar" ? "application/x-tar" : kind === "zip" ? "application/zip" : "application/octet-stream";
    headers.set("content-type", ctype);
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
