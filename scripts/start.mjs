import { spawnSync } from "child_process"

export const start = (dev) => {
  const proc = spawnSync("node", ["dist"], {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: (process.argv.includes("--dev") || dev) ? "DEVELOPMENT" : "PRODUCTION",
    }
  }) 

  return proc
}

if (import.meta.url === `file://${process.argv[1]}`) start();
