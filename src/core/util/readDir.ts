import { readdirSync } from "fs-extra";
import { join } from "path";

export const readDir = (path: string): string[] => {
  const files = readdirSync(path, { withFileTypes: true }).filter(
    (f) => f.name.endsWith(".js") && !f.name.startsWith(".")
  );
  let foundFiles: string[] = [];

  for (const file of files)
    if (file.isDirectory()) foundFiles = [...foundFiles, ...readDir(join(path, file.name))];
    else if (file.isFile()) foundFiles.push(join(path, file.name));

  return foundFiles;
};
