import { PrismaClient } from "@prisma/client";
import { Client } from "discord.js";

export class Bot {
  public client: Client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
  });
  public prisma: PrismaClient = new PrismaClient();

  public isDev: () => boolean = () => process.env["NODE_ENV"] === "DEVELOPMENT";

  constructor(token: string) {
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user!.tag}`);

      this.client.user!.setPresence({ activities: [{ name: "I'm alive!" }] });
    });

    this.client.login(token);
  }
}
