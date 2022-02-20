import { PrismaClient } from "@prisma/client";
import { Client } from "discord.js";
import { readFileSync } from "fs";

export class Bot {
  // Clients
  public client: Client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
  });
  public prisma: PrismaClient = new PrismaClient();

  public version: { number: string; revision: number; codename: string };

  constructor() {
    this.client.on("ready", () => console.log(`Logged in as ${this.client.user?.tag}`));

    const pjson = JSON.parse(readFileSync("./package.json", "utf8"));
    this.version = {
      number: pjson.version,
      revision: pjson.revision,
      codename: pjson.codename
    };
  }

  public login(token: string): void {
    this.client.login(token);
  }
}
