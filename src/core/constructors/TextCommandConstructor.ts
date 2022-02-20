import { Bot } from "core/bot";
import { Client } from "discord.js";
import { BaseCommand } from "./BaseCommandConstructor";

export type TextCommandCallback = (args: { client: Client; instance: Bot }) => void;

interface ITextCommandConfig {
  name: string;
  aliases?: string[];
  description?: string;
  callback: TextCommandCallback;
}

export class TextCommand extends BaseCommand {
  constructor(config: ITextCommandConfig) {
    super(config.name, config.callback, config.description);
  }
}
