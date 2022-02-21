import { readDir } from "./readDir.mjs"
import { build as esbuild } from "esbuild"
import chalk from "chalk";
import { incrementRevision } from "./incrementRevision.mjs";
import { spawnSync } from "child_process";

export const build = async (returnStartTime, incRev, ignorePrisma) => {
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

  if(!ignorePrisma) await spawnSync("prisma", ["generate"], { stdio: "inherit" })

  if (returnStartTime) return start
  else console.log(chalk.bgGreen.black.bold(" BUILD COMPLETE ") + ` ${(Date.now() - start)}ms`)
}

// Stop the function from being called twice if it's imported into another file like watch.mjs
// However it still runs if ran directly from the command line
if (import.meta.url === `file://${process.argv[1]}`) build();
