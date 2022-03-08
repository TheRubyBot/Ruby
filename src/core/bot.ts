import { Client } from "discord.js";
import ora, { Ora } from "ora";
import { PrismaClient } from "@prisma/client";
import getVersion, { IVersion } from "./util/getVersion";

interface IBot {
  readonly $client: Client;
  readonly $prisma: PrismaClient;
  readonly version: IVersion;

  login(token: string): Promise<Client | Error>;
  get client(): Client;
  get prisma(): PrismaClient;
}

export class Bot implements IBot {
  $client;
  $prisma;
  version = getVersion();

  private readonly clientSpinner: Ora = ora("Starting client...").start();
  private readonly prismaSpinner: Ora = ora("Starting prisma...").start();

  constructor() {
    this.$client = new Client({
      intents: ["GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS"]
    });

    this.$client.on("ready", () => {
      this.clientSpinner.succeed(`Logged in as ${this.$client.user!.tag}`);

      this.$client.user!.setPresence({
        activities: [
          {
            name: `Using version ${this.version.string}`
          }
        ]
      });
    });

    this.$prisma = new PrismaClient();

    this.$prisma.$connect().then(() => this.prismaSpinner.succeed("Prisma ready"));
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

export * from "./constructors/ApplicationCommandConstructor";
