import "dotenv/config";
import { Bot } from "./core/bot";

const bot: Bot = new Bot({
  commandsDir: "./commands",
  eventsDir: "./events",
  owners: [],
  devMode: true
});

bot.login(process.env["TOKEN"] ?? "").catch((err) => console.error(err));
