import { ApplicationCommand } from "core/constructors/ApplicationCommandConstructor";

export class ApplciationCommandHandler {
  readonly $commands: Map<string, ApplicationCommand> = new Map();

  constructor(commandFiles: string[]) {
    (async () => {
      for (const file of commandFiles) {
        const command = await import(file);
        if (!command.isSlash()) continue;
        this.$commands.set(command.name, command);
      }
    })();
  }

  public get commands(): Map<string, ApplicationCommand> {
    return this.commands;
  }

  public getCommand(name: string): ApplicationCommand | undefined {
    return this.commands.get(name);
  }
}
