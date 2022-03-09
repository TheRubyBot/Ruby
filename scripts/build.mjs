import { readDir } from "./util/readDir.mjs"
import { build as esbuild } from "esbuild"
import { incrementRevision as incRev } from "./util/incrementRevision.mjs";
import { tag } from "./util/createTag.mjs";
import { existsSync, mkdirSync, rmSync } from "fs";

const basicEsbuildConfig = {
  minify: true,
  format: "cjs",
  platform: "node",
  sourcemap: true,
}

export const rebuildWholeSrcFolder = async ({
  returnStartTime,
  incrementRevision,
  deleteDistDir,
} = {
    returnStartTime: false,
    incrementRevision: true,
    deleteDistDir: true
  }) => {
  const startedAt = Date.now();

  const allFiles = readDir("./src");

  if (deleteDistDir && await existsSync("./dist")) {
    await rmSync("./dist", { recursive: true })
    await mkdirSync("./dist")
  }

  await esbuild({
    ...basicEsbuildConfig,
    entryPoints: allFiles,
    outdir: "./dist"
  })

  if (incrementRevision) incRev()
  if (returnStartTime) return startedAt

  const builtTag = tag("green", "white", "Build complete", `${Date.now() - startedAt}ms`)
  console.log(builtTag)
}

export const buildSingleFile = async (inPath, { } = {}) => {
  const startedAt = Date.now();

  const outPath = inPath.replace(/^src/, "dist").replace(/[t|j]s$/, "js")

  esbuild({
    ...basicEsbuildConfig,
    entryPoints: [inPath],
    outfile: outPath
  })

  return { startedAt }
}

if (import.meta.url === `file://${process.argv[1]}`) rebuildWholeSrcFolder();
