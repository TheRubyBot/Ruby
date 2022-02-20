import { SlashCommand } from "rubycommands";

export = new SlashCommand(
  "test",
  "This is a test command",
  [],
  ({ interaction: i }) => {
    i.reply("Hello, world!");
  }
);
