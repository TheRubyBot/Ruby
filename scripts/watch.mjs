import chalk from "chalk"
import { watch } from "chokidar"
import { buildSingleFile, rebuildWholeSrcFolder } from "./build.mjs"
import { tag } from "./util/createTag.mjs"

const greenTag = (labelText, followingText) => tag("green", "black", labelText, followingText)

// Watch for changes to /src
watch("./src/**/*.ts", { ignoreInitial: true })
  .on("ready", async () => {
    const start = await rebuildWholeSrcFolder({ returnStartTime: true, incrementRevision: false, deleteDistDir: true })
    
    const rebuiltTag = greenTag("Rebuilt", `in ${Date.now() - start}ms`)
    console.log(rebuiltTag)

    const startedTag = greenTag("Ready", "Waiting for changes to ./src/");
    console.log(startedTag)
  })
  .on("all", async (ev, pa) => {
    switch(ev) {
      case "add":
      case "change":
        const { startedAt } = await buildSingleFile(pa, {})
        const eventTag = greenTag(ev, `Built in ${Date.now() - startedAt}ms`)
        console.log(eventTag)
    }
  })

// Watch for changes to /prisma
watch("./prisma/**/*.prisma", { ignoreInitial: true })
  .on("ready", () => {
    const startedTag = greenTag("Ready", "Waiting for changes to ./prisma/")
    console.log(startedTag)
  })
  .on("all", (ev, pa) => {
    console.log(ev, pa)
  })

// import { watch } from "chokidar"
// import chalk from "chalk"
// import { build } from "./build.mjs"
// import { incrementRevision } from "./incrementRevision.mjs"
// import { spawnSync } from "child_process"
// import { start } from "./start.mjs"
// watch("src/**/*.ts", { ignoreInitial: true })
//   .on("ready", async() => {
//     await build(false, false)
//     console.log(greenTag("Ready", "Watching for changes..."))
//     p = start()
// })
//   .on("all", async (ev, pa) => {
//     console.log(ev, pa)
//     switch(ev) {
//       case "add":
//       case "change":
//         console.log(greenTag("Change", `${pa}`));
//         const startTime = await build(true, false, true);
//         const pjson = incrementRevision();

//         if (p) p.kill()
//         p = start();
        
//         console.log(greenTag("Change", `Revision ${pjson.revision} - Built in ${Date.now() - startTime}ms`));
//         break
//       default:
//         console.log(greenTag(ev, pa));
//     }
//   })

// // Watch for changes to prisma schema and generate new schema
// watch("prisma", { ignoreInitial: true })
//   .on("all", (ev, pa) => {
//     switch(ev) {
//     case "add":
//     case "change":
//       console.log(greenTag("Schema", `Updated`));
//       spawnSync("prisma", ["generate"], { stdio: "inherit" })
//       if (p) p.kill()
//       p = start();
//       break
//     default:
//       console.log(greenTag(ev, pa));
//   }
// })
