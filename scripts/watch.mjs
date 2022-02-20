import chokidar from "chokidar";
import chalk from "chalk";
import { build } from "./build.mjs";
import { spawn } from "child_process";

const [, , ...args] = process.argv;

let p; // The bot process

// TODO:
// - Watch with chokidar on src and prisma
// - If a file is changed, build to minified, bundled out.js file

export const greenTag = (label) =>
  chalk.bgGreen.black.bold(` ${label.toUpperCase()} `) + " ";
const readyTag = greenTag("ready");

const startBot = () => {
  if (p) p.kill();

  return spawn("node", ["dist/index"], {
    env: {
      ...process.env,
      NODE_ENV: args.includes("--dev") ? "DEVELOPMENT" : "PRODUCTION",
    },
    stdio: "inherit",
  });
};

//// SRC ////
chokidar
  .watch("src", { ignoreInitial: true })
  .on("ready", () => {
    console.log(readyTag + "Listening to ./src/");
    build();
    p = startBot();
  })
  .on("all", (ev, pa) => {
    switch (ev) {
      case "add":
      case "change":
        build();
        p = startBot();
    }
  });

//// PRISMA ////
chokidar
  .watch("prisma", { ignoreInitial: true })
  .on("ready", () => console.log(readyTag + "Listening to ./prisma/"))
  .on("all", (ev, pa) => {
    console.log(ev, pa);
  });

// import { resolve } from "path";
// import { readFileSync } from "fs";

// let p;
// const srcPath = "src";
// const distPath = "dist";
// const args = process.argv;

// const env = {
//   ...process.env,
//   NODE_ENV: args.includes("--dev") ? "DEVELOPMENT" : "PRODUCTION",
// };

// chokidar.watch(srcPath, { ignoreInitial: true }).on("ready", () => {
//   switch (e) {
//     case "CHANGE":
//     case "ADD":
//       const out = p.replace(/^src/, distPath).replace(/[t|j]s$/, "js");
//       await build(e, p, out);
//       break;
//   }
// });

// const build = async (e, inPath, outPath) => {
//   const start = Date.now();

//   const pjson = JSON.parse(readFileSync("package.json"));

//   if (p) p.kill();

//   await b({
//     entryPoints: [inPath],
//     outfile: "out.js",
//     target: "es2020",
//     minify: true,
//     bundle: true,
//     external: [
//       Object.keys(pjson.dependencies),
//       Object.keys(pjson.devDependencies),
//     ],
//     format: "cjs",
//     platform: "node",
//     allowOverwrite: true,
//     plugins: [tsPaths(resolve(process.cwd(), "tsconfig.json"))],
//   });

//   p = spawn("node", ["out"], { stdio: "inherit", env });

//   console.log(
//     `${chalk.bgGreen.black.bold(
//       ` ${e} (${Date.now() - start}ms) `
//     )} ${inPath} => ${outPath}`
//   );
// };
