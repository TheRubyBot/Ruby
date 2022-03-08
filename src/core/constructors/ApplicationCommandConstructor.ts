import { PrismaClient } from "@prisma/client";
import { CommandInteraction } from "discord.js";
import { Option, OptionBuilder } from "./OptionBuilder";

type ApplicationCommandCallback = (
  this: CommandInteraction,
  { prisma }: { prisma: PrismaClient }
) => void;

interface IApplicationCommand {
  readonly name: string;
  readonly description: string;
  readonly options: OptionBuilder | Option[] | null;
  readonly callback: ApplicationCommandCallback;
}

export class ApplicationCommand implements IApplicationCommand {
  constructor(
    public name: string,
    public description: string,
    public options: OptionBuilder | Option[] | null,
    public callback: ApplicationCommandCallback
  ) {
    if (!name) throw new Error("Name of Application Commands are required");
    else if (!description)
      throw new Error(`Description of Application Command "${name}" is missing.`);
    else if (!(options instanceof OptionBuilder) || !(options instanceof Option))
      throw new Error(`Options of Application Command "${name}" is missing.`);
    else if ("options" in options) options = options.options;
  }
}
