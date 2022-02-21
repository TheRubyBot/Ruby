import { readdirSync } from "fs"
import { join, resolve } from "path/posix"

export const readDir = (path) => {
  const files = readdirSync(path, { withFileTypes: true })
  let result = []

  for (const file of files) {
    if (file.isDirectory()) {
      result = [...result, ...readDir(resolve(join(path, file.name)))]
    } else {
      result.push(resolve(join(path, file.name)))
    }
  }

  return result
}