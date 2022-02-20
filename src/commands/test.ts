import { ApplicationCommand } from "@constructors/ApplicationCommandConstructor";

export = new ApplicationCommand(
  "test",
  "This is a test command",
  ({ interaction: i }) => {
    i.reply("This is a test command");
  }
);
