import { Client } from "discord.js";
import ora, { Ora } from "ora";
import { PrismaClient } from "@prisma/client";
import getVersion, { IVersion } from "./util/getVersion";
import { join } from "path";

export class Bot implements IBot {
  $client;
  $prisma;
  version = getVersion();

  // Config
  $commandsDir = "./commands";
  $eventsDir = "./events";
  $owners: string[] = [];
  $devMode = false;

  private readonly clientSpinner: Ora = ora("Starting client...").start();
  private readonly prismaSpinner: Ora = ora("Starting prisma...").start();

  constructor({ commandsDir, eventsDir, owners, devMode }: IBotConfig) {
    this.$client = new Client({
      intents: ["GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS"]
    });

    this.$prisma = new PrismaClient();
    this.$prisma.$connect().then(() => this.prismaSpinner.succeed("Prisma ready"));

    this.$client.on("ready", async () => {
      this.setPresence();
      this.clientSpinner.succeed(`Logged in as ${this.$client.user!.tag}`);

      await this.$client.application!.fetch();
      this.$owners.push(this.$client.application!.owner!.id);
    });

    this.$commandsDir = commandsDir || this.$commandsDir;
    this.$eventsDir = eventsDir || this.$eventsDir;
    this.correctPaths();
    this.$devMode = devMode || this.$devMode;
    this.verifyOwners(owners);
  }
  private setPresence(): void {
    this.$client.user!.setPresence({
      activities: [
        {
          name: `Using version ${this.version.string}`
        }
      ]
    });
  }
  private correctPaths(): void {
    let path;
    if (require.main && (path = require.main.path)) {
      this.$commandsDir = join(path, this.$commandsDir);
      this.$eventsDir = join(path, this.$eventsDir);
    }
  }
  private verifyOwners(owners: string[]): void {
    for (const owner of owners) {
      this.$client.users.fetch(owner).catch(() => {
        throw new Error(`Owner ${owner} does not exist.`);
      });
      this.$owners.push(owner);
    }
  }
  login(token: string): Promise<Client | Error> {
    return new Promise<Client | Error>((resolve, reject) => {
      this.$client.login(token).catch(reject);
      resolve(this.$client);
    });
  }
  get client(): Client {
    return this.$client;
  }
  get prisma(): PrismaClient {
    return this.$prisma;
  }
}

interface IBot {
  readonly $client: Client;
  readonly $prisma: PrismaClient;
  readonly version: IVersion;

  // Config
  readonly $commandsDir: string;
  readonly $eventsDir: string;
  // Readonly $prefixes: string[];
  readonly $owners: string[];
  readonly $devMode: boolean;

  // Methods
  login(token: string): Promise<Client | Error>;
  get client(): Client;
  get prisma(): PrismaClient;
}

interface IBotConfig {
  commandsDir: string;
  eventsDir: string;
  owners: string[];
  devMode: boolean;
}

export * from "./constructors/ApplicationCommandConstructor";
export * from "./constructors/OptionBuilder";
