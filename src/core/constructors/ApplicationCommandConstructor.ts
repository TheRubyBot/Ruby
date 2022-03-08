import { PrismaClient } from "@prisma/client";
import { CommandInteraction } from "discord.js";

type Options = Record<string, string | boolean | number | Record<string, string>[]>[];

type ApplicationCommandCallback = (
  this: CommandInteraction,
  { prisma }: { prisma: PrismaClient }
) => void;

interface IApplicationCommand {
  readonly name: string;
  readonly description: string;
  readonly options: Options | null; // TODO: OptionBuilder | Option;
  readonly callback: ApplicationCommandCallback;
}

export class ApplicationCommand implements IApplicationCommand {
  constructor(
    public name: string,
    public description: string,
    public options: Options | null = null,
    public callback: ApplicationCommandCallback
  ) {
    if (!name) throw new Error("Name of Application Commands are required");
    if (!description) throw new Error(`Description of Application Command "${name}" is missing.`);
    // If (!(options instanceof OptionBuilder) || !(options instanceof Option)) throw new Error(`Options of Application Command "${name}" is missing.`);
  }
}
