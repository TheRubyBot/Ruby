import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ApplicationCommand } from "../../core/constructors/ApplicationCommandConstructor";

export = new ApplicationCommand(
  "ruby",
  "Get information about Ruby",
  [],
  async ({ interaction: i, client, instance: bot }) => {
    const embed = new MessageEmbed({
      author: {
        name: `Ruby${bot.isDev() ? " (Dev)" : ""} Info`,
        icon_url: client.user?.avatarURL() as string,
      },
      fields: [
        { name: "Members", value: client.users.cache.size.toString(), inline: true },
        { name: "Servers", value: client.guilds.cache.size.toString(), inline: true }
      ],
      footer: {
        text: "Oh, also powered by Pepsi Max 😝"
      }
    });

    const versionString = bot.version.number + (bot.isDev() ? `-rev${bot.version.revision}` : "")
    embed.setDescription(`Running version **${versionString}, ${bot.version.codename}**, powered by [**discord.js**](https://github.com/discordjs/discord.js)`)

    const actionRow = new MessageActionRow()
      .addComponents(
        new MessageButton({
          label: "Website",
          style: "LINK",
          url: "https://ruby.morganuk.ga"
        }),
        new MessageButton({
          label: "Join the Discord server",
          style: "LINK",
          url: "https://discord.gg/nHMKwCKyqg"
        }),
        new MessageButton({
          label: "Invite to your server",
          style: "LINK",
          url: "https://ruby.morganuk.ga/invite",
          disabled: bot.isDev()
        })
      )

    await i.reply({ embeds: [embed], components: [actionRow] });
  }
);
