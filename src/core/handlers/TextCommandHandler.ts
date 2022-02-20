import { TextCommand } from "core/constructors/TextCommandConstructor";

export class TextCommandHandler {
  readonly $commands: Map<string, TextCommand> = new Map();

  constructor(commandFiles: string[]) {
    (async () => {
      for (const file of commandFiles) {
        const command = await import(file);
        if (!command.isSlash()) continue;
        this.$commands.set(command.name, command);
      }
    })();
  }

  public get commands(): Map<string, TextCommand> {
    return this.commands;
  }

  public getCommand(name: string): TextCommand | undefined {
    return this.commands.get(name);
  }
}
