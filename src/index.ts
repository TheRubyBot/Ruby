import "dotenv/config";
import { Bot } from "./core/bot";

const bot: Bot = new Bot({
  commandsDir: "commands",
  owners: ["796336114113183746"],
  testServers: ["876649337659215976"],
  prefixes: ["."],
  globalSlashTesting: process.env["NODE_ENV"] === "DEVELOPMENT"
});

bot.login(process.env["TOKEN"]!);
