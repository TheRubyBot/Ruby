import { readdirSync } from "fs";
import { join, resolve } from "path/posix";

interface IReadDirConfig {
  ignoreDot: boolean;
}

export const readDir = (path: string, config: IReadDirConfig): string[] => {
  const files = readdirSync(path, { withFileTypes: true }).filter(
    (file) => config.ignoreDot && !file.name.startsWith(".")
  );
  let result: string[] = [];

  for (const file of files)
    if (file.isDirectory()) result = [...result, ...readDir(resolve(join(path, file.name)), config)];
    else result.push(resolve(join(path, file.name)));

  return result;
};
