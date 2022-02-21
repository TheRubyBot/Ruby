import chalk from "chalk"
import { spawnSync } from "child_process"
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
        break;
    }
  })

// Watch for changes to /prisma
watch("./prisma/**/*.prisma", { ignoreInitial: true })
  .on("ready", () => {
    const startedTag = greenTag("Ready", "Waiting for changes to ./prisma/")
    console.log(startedTag)
  })
  .on("all", (ev, pa) => {
    switch (ev) {
      case "add":
      case "change":
        const generatedTag = greenTag("Generated", "Generated Prisma schema")
        console.log(generatedTag)
        spawnSync("prisma", ["generate"], { stdio: "inherit" });
        break;
    }
  })

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
