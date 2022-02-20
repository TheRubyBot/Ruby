import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { Client } from "discord.js";
import { RubyError } from "./util/Error";
import { readDir } from "./util/readDir";

interface IConfig {
  commandsDir: string;
  owners?: string[];
  testServers?: string[];
  globalTesting?: boolean;
  prefix?: string[];
}

export class Bot {
  public client: Client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
  });

  public commandsDir: string;

  public prisma: PrismaClient = new PrismaClient();

  public isDev: () => boolean = () => process.env["NODE_ENV"] === "DEVELOPMENT";

  constructor(config: IConfig) {
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user!.tag}`);

      this.client.user!.setPresence({ activities: [{ name: "I'm alive!" }] });
    });

    this.commandsDir = config.commandsDir;

    if (require.main) {
      const { path } = require.main;

      if (path) {
        this.commandsDir = join(path, this.commandsDir);
      }
    }

    const commandFiles = readDir(this.commandsDir, { ignoreDot: true });
  }

  public login(token: string) {
    if (!token) throw new RubyError("No token provided");

    this.client.login(token).catch(() => {
      throw new RubyError("Invalid token");
    });
  }
}
