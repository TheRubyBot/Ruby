import { readDir } from "./util/readDir.mjs"
import { build as esbuild } from "esbuild"
import { incrementRevision as incRev } from "./util/incrementRevision.mjs";
import { tag } from "./util/createTag.mjs";
import { existsSync, mkdirSync, rmSync } from "fs";
import { resolve } from "path";

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

// export const build = async (returnStartTime, incRev, ignorePrisma) => {
//   const start = Date.now();
//   const allFiles = readDir("./src");

//   await esbuild({
//     minify: true,
//     format: "cjs",
//     entryPoints: allFiles,
//     outdir: "./dist",
//     platform: "node",
//     sourcemap: true,
//   })

//   if (incRev) incrementRevision()

//   if(!ignorePrisma) await spawnSync("prisma", ["generate"], { stdio: "inherit" })

//   if (returnStartTime) return start
//   else console.log(chalk.bgGreen.black.bold(" BUILD COMPLETE ") + ` ${(Date.now() - start)}ms`)
// }

// // Stop the function from being called twice if it's imported into another file like watch.mjs
// // However it still runs if ran directly from the command line
if (import.meta.url === `file://${process.argv[1]}`) rebuildWholeSrcFolder();
