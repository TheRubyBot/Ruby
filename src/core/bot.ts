import { PrismaClient } from "@prisma/client";
import { Client } from "discord.js";
import { readFileSync } from "fs";
import { join } from "path";
import { ApplciationCommandHandler } from "./handlers/ApplicationCommandHandler";
import { TextCommandHandler } from "./handlers/TextCommandHandler";
import { readDir } from "./util/readDir";

interface IBotConfig {
  commandsDir: string;
  owners: string[];
  testServers: string[];
  prefixes: string[];
}

export class Bot {
  // Clients
  public client: Client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
  });
  public prisma: PrismaClient = new PrismaClient();

  public version: { number: string; revision: number; codename: string };

  // Discord Configs
  public commandsDir = "commands";
  public owners: string[] = [];
  public testServers: string[] = [];
  public prefixes: string[] = [];

  // Handlers
  private readonly $applicationCommandHandler: ApplciationCommandHandler;
  // Private readonly $eventHandler: EventHandler;
  // Private readonly $textCommandHandler: TextCommandHandler;

  constructor(config: IBotConfig) {
    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user?.tag}`);

      this.prefixes.push(`<@${this.client.user?.id}>`);
      this.prefixes.push(`<@!${this.client.user?.id}>`);
    });

    const pjson = JSON.parse(readFileSync("./package.json", "utf8"));
    this.version = {
      number: pjson.version,
      revision: pjson.revision,
      codename: pjson.codename
    };

    const { commandsDir, owners, prefixes, testServers } = config;

    this.commandsDir = commandsDir;
    this.prefixes = prefixes;

    for (const owner of owners)
      this.client.users.fetch(owner).catch(() => {
        throw new Error(`Owner: ${owner} cannot be seen by bot`);
      });

    for (const testServer of testServers)
      this.client.guilds.fetch(testServer).catch(() => {
        throw new Error(`Test server: ${testServer} cannot be seen by bot`);
      });

    if (require.main) {
      const { path } = require.main;

      if (path) this.commandsDir = join(path, this.commandsDir);
    }

    const commandFiles = readDir(this.commandsDir, { ignoreDot: true });

    this.$applicationCommandHandler = new ApplciationCommandHandler(commandFiles);
  }

  public login(token: string): void {
    this.client.login(token);
  }
}
