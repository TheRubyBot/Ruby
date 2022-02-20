import { readFileSync, writeFileSync } from "fs";

export const incrementRevision = () => {
  const pjson = JSON.parse(readFileSync("package.json", "utf-8"));

  pjson.revision++

  writeFileSync("package.json", JSON.stringify(pjson, null, 2), "utf-8");

  return pjson
};
