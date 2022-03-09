import { spawnSync } from "child_process"

export const start = () => {
  const env = process.argv.includes("--dev") ? "DEVELOPMENT" : "PRODUCTION"
  
  const proc = spawnSync("node", ["dist"], {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: env,
    }
  }) 

  return proc
}

if (import.meta.url === `file://${process.argv[1]}`) start();
