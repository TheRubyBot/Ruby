import { Ora } from "ora";
import { ApplicationCommand } from "../bot";

export class ApplicationCommandHandler {
  public readonly commands: Map<string, ApplicationCommand> = new Map();

  constructor(spinners: Record<string, Ora>, commandFiles: string[]) {
    (async () => {
      for (const file of commandFiles) {
        let i = await import(file);
        if ("default" in i) i = i.default;
        else if ("command" in i) i = i.command;

        if ("options" in i) this.commands.set(i.name, i);
      }
      spinners.commands.succeed(`Loaded ${this.commands.size} commands`);
    })();
  }
}
