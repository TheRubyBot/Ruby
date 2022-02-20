import { readFileSync } from "fs";

export const incrementRevision = () => {
  const pjson = JSON.parse(readFileSync("package.json", "utf-8"));

  pjson.revision++

  return pjson
};
