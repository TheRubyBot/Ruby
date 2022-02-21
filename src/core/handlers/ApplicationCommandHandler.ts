import { REST } from "@discordjs/rest";
import { ApplicationCommand } from "../../core/constructors/ApplicationCommandConstructor";
import { Routes } from "discord-api-types/v10";
import { Bot } from "core/bot";

export class ApplciationCommandHandler {
  readonly $commands: Map<string, ApplicationCommand>;

  constructor(commandFiles: ApplicationCommand[], i: Bot) {
    this.$commands = new Map(commandFiles.map((x) => [x.name, x]));

    const configs = commandFiles.map(({ name, type, description, options }) => ({ name, type, description, options }));

    const rest = new REST({ version: "10" }).setToken(i.client.token!);

    (async () => {
      console.log(i.testServers);
      if (i.globalSlashTesting)
        for (const server of i.testServers)
          await rest.put(Routes.applicationGuildCommands(i.client.user!.id, server), { body: configs });
      else await rest.put(Routes.applicationCommands(i.client.user!.id), { body: configs });
    })();

    i.client.on("interactionCreate", (int) => {
      if (!int.isCommand()) return;

      const command = this.$commands.get(int.commandName);
      if (!command) {
        int.reply("This command was not found!");
        return;
      }

      try {
        command.callback({ client: i.client, instance: i, interaction: int });
      } catch (e) {
        int.reply("An Error Ocurred");
        console.log(e);
      }
    });
  }

  public get commands(): Map<string, ApplicationCommand> {
    return this.commands;
  }

  public getCommand(name: string): ApplicationCommand | undefined {
    return this.commands.get(name);
  }
}
