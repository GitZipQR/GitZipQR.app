import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync, execFile } from "node:child_process";

export function findUp(start: string, rel: string, maxDepth = 8): string | undefined {
  let cur = path.resolve(start);
  for (let i = 0; i < maxDepth; i++) {
    const cand = path.join(cur, rel);
    if (fs.existsSync(cand)) return cand;
    const next = path.dirname(cur);
    if (next === cur) break;
    cur = next;
  }
  return undefined;
}

export function resolveBin(name: "encode" | "decode"): string {
  const rel = path.join("GitZipQR.cpp", "build", name);
  const cand = findUp(process.cwd(), rel);
  if (cand && fs.existsSync(cand)) return cand;
  const which = spawnSync("sh", ["-lc", `command -v ${name}`], { encoding: "utf8" });
  if (which.status === 0 && which.stdout.trim()) return which.stdout.trim();
  throw new Error(`${name} binary not found`);
}

export function hasCmd(cmd: string): boolean {
  const r = spawnSync("sh", ["-lc", `command -v ${cmd}`], { stdio: "ignore" });
  return r.status === 0;
}

export function execFileP(cmd: string, args: string[], opts: Record<string, any> = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, opts, (err) => (err ? reject(err) : resolve()));
  });
}

export function runStreaming(cmd: string, args: string[], opts: Record<string, any> = {}): Promise<number> {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { ...opts });
    p.on("error", reject);
    p.on("close", (code) => resolve(code ?? -1));
  });
}

export async function makeTempDir(prefix = "gzqr-web-"): Promise<string> {
  return await fsp.mkdtemp(path.join(os.tmpdir(), prefix));
}

export function sanitizeRel(p: string): string {
  let rel = String(p || "").replace(/^[\\/]+/, "").replace(/\\+/g, "/");
  while (rel.startsWith("./")) rel = rel.slice(2);
  if (rel.includes("..")) throw new Error("Bad path");
  return rel || "file";
}

export async function writeUploads(files: File[], paths: string[], root: string): Promise<{ inputPath: string; inputDir: string; }> {
  const inputDir = path.join(root, "input");
  await fsp.mkdir(inputDir, { recursive: true });
  const outPaths: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const rel = sanitizeRel(paths[i] || f.name);
    const outPath = path.join(inputDir, rel);
    await fsp.mkdir(path.dirname(outPath), { recursive: true });
    const buf = Buffer.from(await f.arrayBuffer());
    await fsp.writeFile(outPath, buf);
    outPaths.push(outPath);
  }
  let inputPath = inputDir;
  if (outPaths.length === 1) {
    const rel = sanitizeRel(paths[0] || files[0]?.name || "");
    if (!rel.includes("/") && !rel.includes("\\")) inputPath = outPaths[0];
  }
  return { inputPath, inputDir };
}
