import { build as b } from "esbuild";
import fs from "fs-extra";
import { greenTag } from "./watch.mjs";

export const build = () => {
  const start = Date.now();
  const pjson = JSON.parse(fs.readFileSync("package.json"));
  const dependencies = {
    ...pjson.dependencies,
    ...pjson.devDependencies,
  };

  console.log(greenTag("Building..."));

  b({
    minify: true,
    keepNames: true,
    external: [...Object.keys(dependencies)],
    bundle: true,
    entryPoints: ["./src"],
    format: "cjs",
    outfile: "./dist/index.js",
    tsconfig: "tsconfig.json",
    platform: "node",
  });

  console.log(greenTag(`Built`) + `${Date.now() - start}ms`);
};
