import { ApplicationCommand } from "../core/constructors/ApplicationCommandConstructor";

export = new ApplicationCommand(
  "newtest",
  "This is a test command with description, cool!",
  [],
  ({ interaction: i }) => {
    i.reply("hola");
  }
);
