import { Bot } from "core/bot";
import { Client, CommandInteraction } from "discord.js";
import { BaseCommand } from "./BaseCommandConstructor";

export type ApplicationCommandCallback = (args: {
  client: Client;
  instance: Bot;
  interaction: CommandInteraction;
}) => void;

export class ApplicationCommand extends BaseCommand {
  public type = 1;

  constructor(name: string, description: string, callback: ApplicationCommandCallback) {
    super(name, callback, description);
  }
}
