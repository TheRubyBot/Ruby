import { config } from "dotenv";
import { Bot } from "@core/bot";

switch (process.env["NODE_ENV"]) {
  case "PRODUCTION":
    config();
    break;
  case "DEV":
    config({
      path: "local.env",
    });
    break;
}

const bot = new Bot(process.env["TOKEN"]!);
