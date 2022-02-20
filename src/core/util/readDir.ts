import { join } from "path";
import { readdirSync } from "fs";

interface IReadDirConfig {
  ignoreDot: boolean;
}

export const readDir = (path: string, config: IReadDirConfig) => {
  const files = readdirSync(path, { withFileTypes: true }).filter(
    (x) => config.ignoreDot && !x.name.startsWith(".")
  );
  let matches: string[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      matches = [...matches, ...readDir(join(path, file.name), config)];
    } else {
      matches.push(join(path, file.name));
    }
  }

  return matches;
};
