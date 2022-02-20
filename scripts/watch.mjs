import { watch } from "chokidar"
import chalk from "chalk"
import { build } from "./build.mjs"
import { incrementRevision } from "./incrementRevision.mjs"

const greenTag = (label, text) => chalk.bgGreen.black.bold(` ${label.toUpperCase()} `) + ` ${text}`

watch("./src", { ignoreInitial: true })
  .on("ready", async() => {
    await build(false, false)
    console.log(greenTag("Ready", "Watching for changes..."))
})
  .on("all", async (ev, pa) => {
    switch(ev) {
      case "add":
      case "change":
        console.log(greenTag("Change", `${pa}`));
        const start = await build(true, false);
        const pjson = incrementRevision();
        
        console.log(greenTag("Change", `Revision ${pjson.revision} - Built in ${Date.now() - start}ms`));

        break
      default:
        console.log(greenTag(ev, pa));
    }
  })
