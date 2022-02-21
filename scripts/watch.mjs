import { watch } from "chokidar"
import chalk from "chalk"
import { build } from "./build.mjs"
import { incrementRevision } from "./incrementRevision.mjs"
import { spawnSync } from "child_process"
import { start } from "./start.mjs"

const greenTag = (label, text) => chalk.bgGreen.black.bold(` ${label.toUpperCase()} `) + ` ${text}`
let proc;

const killBot = () => { if (proc) proc.kill() }

watch("./src", { ignoreInitial: true })
  .on("ready", async() => {
    await build(false, false)
    console.log(greenTag("Ready", "Watching for changes..."))
    proc = start()
})
  .on("all", async (ev, pa) => {
    switch(ev) {
      case "add":
      case "change":
        console.log(greenTag("Change", `${pa}`));
        const start = await build(true, false, true);
        const pjson = incrementRevision();

        killBot();
        proc = start();
        
        console.log(greenTag("Change", `Revision ${pjson.revision} - Built in ${Date.now() - start}ms`));
        break
      default:
        console.log(greenTag(ev, pa));
    }
  })

// Watch for changes to prisma schema and generate new schema
watch("./prisma", { ignoreInitial: true })
  .on("all", (ev, pa) => {
    switch(ev) {
    case "add":
    case "change":
      console.log(greenTag("Schema", `Updated`));
      spawnSync("prisma", ["generate"], { stdio: "inherit" })
        killBot();
        proc = start();
      break
    default:
      console.log(greenTag(ev, pa));
  }
})
