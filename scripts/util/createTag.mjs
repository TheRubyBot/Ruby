import chalk from "chalk"

export const tag = (background, foreground, labelText, followingText) => {
  background = `bg${background[0].toUpperCase()}${background.substring(1)}`
  const chalkText = chalk[background][foreground].bold(` ${labelText.toUpperCase()} `) + " "

  return chalkText + followingText
}
