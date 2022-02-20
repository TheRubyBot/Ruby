import { Bot } from "@core/bot";
import { Client, CommandInteraction } from "discord.js";
import { BaseCommand } from "./BaseCommandConstructor";

type ApplicationCommandCallbackFunction = (args: {
  client: Client;
  instance: Bot;
  interaction: CommandInteraction;
}) => void;

export class ApplicationCommand extends BaseCommand {
  constructor(
    name: string,
    description: string,
    public callback: ApplicationCommandCallbackFunction
  ) {
    super(name, "APPLICATION", description);

    console.log(this);
  }
}
