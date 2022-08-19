const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
        const logChannel = client.channels.cache.get(process.env.logs);

        if (interaction.commandName.includes("-staff")) {
          const imgBadge = new AttachmentBuilder("./src/database/img/badges/staff-badge.png");

          const logEmbed = new EmbedBuilder()
            .setColor("#838CF6")
            .setAuthor({
              name: "STAFF LOGS",
              iconURL: "attachment://staff-badge.png",
            })
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
              { name: "🚀 Commande", value: `\`${interaction}\``, inline: true },
              { name: "👤 Membre", value: `${interaction.user}`, inline: true },
              { name: "📨 Salon", value: `${interaction.channel}`, inline: true }
            )
            .setFooter({ text: interaction.user.id })
            .setTimestamp();
          logChannel.send({ embeds: [logEmbed], files: [imgBadge] });
          return console.log("\x1b[32m", `📨 [ ${interaction} ] ⇢ [ ${interaction.user.tag} (${interaction.user.id}) ] dans [ ${interaction.channel.name} ]`);
        } else {
          if (interaction.commandName === "confession") {
            return console.log("\x1b[32m", `📨 [ ${interaction} ] ⇢ [ ${interaction.user.id} ] dans [ ${interaction.channel.name} ]`);
          } else {
            const imgBadge = new AttachmentBuilder("./src/database/img/badges/member-badge.png");
  
            const logEmbed = new EmbedBuilder()
              .setColor("#64BDE4")
              .setAuthor({
                name: "MEMBER LOGS",
                iconURL: "attachment://member-badge.png",
              })
              .setThumbnail(interaction.user.displayAvatarURL())
              .addFields(
                { name: "🚀 Commande", value: `\`${interaction}\``, inline: true },
                { name: "👤 Membre", value: `${interaction.user}`, inline: true },
                {name: "📨 Salon", value: `${interaction.channel}`, inline: true }
              )
              .setFooter({ text: interaction.user.id })
              .setTimestamp();
            logChannel.send({ embeds: [logEmbed], files: [imgBadge] });
            return console.log("\x1b[32m", `📨 [ ${interaction} ] ⇢ [ ${interaction.user.tag} (${interaction.user.id}) ] dans [ ${interaction.channel.name} ]`);
          };
        };
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Something went wrong while executing this command...",
          ephemeral: true,
        });
      }
    }
  },
};
