import { ApplicationCommand } from "../../core/constructors/ApplicationCommandConstructor";

export class ApplciationCommandHandler {
  readonly $commands: Map<string, ApplicationCommand>;

  constructor(commandFiles: ApplicationCommand[]) {
    commandFiles.map(({ name, type, description, callback }) => ({ name, type, description, callback }));

    this.$commands = new Map(commandFiles.map((x) => [x.name, x]));
  }

  public get commands(): Map<string, ApplicationCommand> {
    return this.commands;
  }

  public getCommand(name: string): ApplicationCommand | undefined {
    return this.commands.get(name);
  }
}
