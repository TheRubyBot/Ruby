import { PrismaClient } from "@prisma/client";
import { Client } from "discord.js";
import { readFileSync } from "fs";
import { join } from "path";
import { ApplicationCommand } from "./constructors/ApplicationCommandConstructor";
import { TextCommand } from "./constructors/TextCommandConstructor";
import { ApplciationCommandHandler } from "./handlers/ApplicationCommandHandler";
import { readDir } from "./util/readDir";

interface IBotConfig {
  commandsDir: string;
  owners: string[];
  testServers: string[];
  prefixes: string[];
  globalSlashTesting: boolean;
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
  public globalSlashTesting = false;

  // Handlers
  private $applicationCommandHandler: ApplciationCommandHandler | undefined;
  // Private readonly $eventHandler: EventHandler;
  // Private readonly $textCommandHandler: TextCommandHandler;

  constructor(config: IBotConfig) {
    const pjson = JSON.parse(readFileSync("./package.json", "utf8"));
    this.version = {
      number: pjson.version,
      revision: pjson.revision,
      codename: pjson.codename
    };

    const { commandsDir, owners, prefixes, testServers, globalSlashTesting } = config;

    this.commandsDir = commandsDir;
    this.prefixes = prefixes;
    this.globalSlashTesting = globalSlashTesting;

    for (const owner of owners)
      this.client.users.fetch(owner).catch(() => {
        throw new Error(`Owner: ${owner} cannot be seen by bot`);
      });
    this.owners = owners;

    for (const testServer of testServers)
      this.client.guilds.fetch(testServer).catch(() => {
        throw new Error(`Test server: ${testServer} cannot be seen by bot`);
      });
    this.testServers = testServers;

    if (require.main) {
      const { path } = require.main;

      if (path) this.commandsDir = join(path, this.commandsDir);
    }

    this.client.on("ready", () => {
      console.log(`Logged in as ${this.client.user?.tag}`);

      this.prefixes.push(`<@${this.client.user?.id}>`);
      this.prefixes.push(`<@!${this.client.user?.id}>`);

      const commandFiles = readDir(this.commandsDir, { ignoreDot: true }).filter((file) => file.endsWith(".js"));

      const seperated = this.seperateCommands(commandFiles);

      this.$applicationCommandHandler = seperated.applicationCommandHandler;
    });
  }

  public login(token: string): void {
    this.client.login(token);
  }

  private seperateCommands(commandFiles: string[]): { applicationCommandHandler: ApplciationCommandHandler } {
    const applicationCommands: ApplicationCommand[] = [];
    const textCommands: TextCommand[] = [];

    for (const file of commandFiles) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      let imported = require(file);

      if (imported.command) imported = imported.command;
      else if (imported.default) imported = imported.default;

      if (imported.isSlash()) applicationCommands.push(imported);
      else if (imported.isText()) textCommands.push(imported);
    }

    return {
      applicationCommandHandler: new ApplciationCommandHandler(applicationCommands, this)
    };
  }
}
