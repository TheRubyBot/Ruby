import { spawnSync, spawn } from "child_process"
import { watch } from "chokidar"
import { buildSingleFile, rebuildWholeSrcFolder } from "./build.mjs"
import { tag } from "./util/createTag.mjs"
import { incrementRevision } from "./util/incrementRevision.mjs"
import "dotenv/config"

const greenTag = (labelText, followingText) => tag("green", "black", labelText, followingText)

let bot;

const [, , ...args] = process.argv

const startBot = () => spawn("node", ["dist"], { stdio: "inherit", env: { ...process.env, NODE_ENV: args.includes("--dev") ? "DEVELOPMENT" : "PRODUCTION" } })

// Watch for changes to /src
watch("./src/**/*.ts", { ignoreInitial: true })
  .on("ready", async () => {
    const start = await rebuildWholeSrcFolder({ returnStartTime: true, incrementRevision: false, deleteDistDir: true })

    const rebuiltTag = greenTag("Rebuilt", `in ${Date.now() - start}ms`)
    console.log(rebuiltTag)

    const startedTag = greenTag("Ready", "Waiting for changes to ./src/");
    console.log(startedTag)

    // Start the bot
    bot = startBot();
  })
  .on("all", async (ev, pa) => {
    switch (ev) {
      case "add":
      case "change":
        const { startedAt } = await buildSingleFile(pa, {})
        incrementRevision();
        const eventTag = greenTag(ev, `Built in ${Date.now() - startedAt}ms`)
        console.log(eventTag)

        // Kill & start the bot
        if (bot) bot.kill()
        bot = await startBot();
        break;
    }
  })

// Watch for changes to /prisma
watch("./prisma/**/*.prisma", { ignoreInitial: true })
  .on("ready", () => {
    const startedTag = greenTag("Ready", "Waiting for changes to ./prisma/")
    console.log(startedTag)
  })
  .on("all", async (ev, pa) => {
    switch (ev) {
      case "add":
      case "change":
        incrementRevision();
        spawnSync("prisma", ["generate"], { stdio: "inherit" });
        const generatedTag = greenTag("Generated", "Generated Prisma schema")
        console.log(generatedTag)

        // Kill & start the bot
        if (bot) bot.kill();
        bot = await startBot();
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
