import { readDir } from "./readDir.mjs"
import { build as esbuild } from "esbuild"
import chalk from "chalk";

export const build = async (returnStartTime) => {
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

  if (returnStartTime) return start
  console.log(chalk.bgGreen.black.bold(" BUILD COMPLETE ") + ` ${(Date.now() - start)}ms`)
}

build();
