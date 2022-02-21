// TODO: Rewrite/refactor all of this

import chalk from "chalk"
import { watch } from "chokidar"

// Create a Tag easily
const tag = (background, foreground, labelText, followingText) => {
  background = `bg${background[0].toUpperCase()}${background.substring(1)}`
  const chalkText = chalk[background][foreground].bold(` ${labelText.toUpperCase()} `) + " "

  return chalkText + followingText
}

const greenTag = (labelText, followingText) => tag("green", "white", labelText, followingText)

// Watch for changes to /src
watch("./src/**/*.ts").on("ready", () => {
  const startedTag = greenTag("Ready", "Waiting for changes to ./src/");
  console.log(startedTag)
})

// Watch for changes to /prisma
watch("./prisma/**/*.prisma").on("ready", () => {
  const startedTag = greenTag("Ready", "Waiting for changes to ./prisma/")
  console.log(startedTag)
})
