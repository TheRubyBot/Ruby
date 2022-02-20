import { readDir } from "./readDir.mjs"
import { build as esbuild } from "esbuild"
import chalk from "chalk";
import { incrementRevision } from "./incrementRevision.mjs";

export const build = async (returnStartTime, incRev) => {
  const start = Date.now();
  const allFiles = readDir("./src");

  await esbuild({
    minify: true,
    format: "cjs",
    entryPoints: allFiles,
    outdir: "./dist",
    platform: "node",
    sourcemap: true,
  })

  if (incRev) incrementRevision()

  if (returnStartTime) return start
  console.log(chalk.bgGreen.black.bold(" BUILD COMPLETE ") + ` ${(Date.now() - start)}ms`)
}

build();
