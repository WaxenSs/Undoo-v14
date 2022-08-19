const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      const logChannel = client.channels.cache.get(process.env.logs);

      try {
        await command.execute(interaction, client);

        if (interaction.commandName.includes("-staff")) {
          console.log('\x1b[34m', `[STAFF LOGS 1/2]- \x1b[1m${interaction}\x1b[0m\x1b[34m ► ${interaction.user.tag} (${interaction.user.id}) in ${interaction.channel.name}`,'\x1b[0m');
          const imgBadge = new AttachmentBuilder("./src/database/img/badges/staff-badge.png");

          const logEmbed = new EmbedBuilder()
            .setColor("#838CF6")
            .setAuthor({ name: "STAFF LOGS", iconURL: "attachment://staff-badge.png" })
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
              { name: "🚀 Commande", value: `\`${interaction}\``, inline: true },
              { name: "👤 Membre", value: `${interaction.user}`, inline: true },
              { name: "📨 Salon", value: `${interaction.channel}`, inline: true }
            )
            .setFooter({ text: interaction.user.id })
            .setTimestamp();
          logChannel.send({ embeds: [logEmbed], files: [imgBadge] });
          return console.log('\x1b[34m\x1b[2m', `[STAFF LOGS 2/2]-- \x1b[1m${interaction}\x1b[0m\x1b[2m\x1b[34m ► Log sent in ${logChannel.name} channel`,'\x1b[0m');
        } else {
          if (interaction.commandName === "confession") {
            return console.log('\x1b[34m', `[MEMBER LOGS]- \x1b[1m${interaction}\x1b[0m\x1b[34m ► ${interaction.user.id} in ${interaction.channel.name}`,'\x1b[0m');
          } else {
            console.log('\x1b[34m', `[MEMBER LOGS 1/2]- \x1b[1m${interaction}\x1b[0m\x1b[34m ► ${interaction.user.tag} (${interaction.user.id}) in ${interaction.channel.name}`,'\x1b[0m');
            const imgBadge = new AttachmentBuilder("./src/database/img/badges/member-badge.png");
  
            const logEmbed = new EmbedBuilder()
              .setColor("#64BDE4")
              .setAuthor({ name: "MEMBER LOGS", iconURL: "attachment://member-badge.png" })
              .setThumbnail(interaction.user.displayAvatarURL())
              .addFields(
                { name: "🚀 Commande", value: `\`${interaction}\``, inline: true },
                { name: "👤 Membre", value: `${interaction.user}`, inline: true },
                {name: "📨 Salon", value: `${interaction.channel}`, inline: true }
              )
              .setFooter({ text: interaction.user.id })
              .setTimestamp();
            logChannel.send({ embeds: [logEmbed], files: [imgBadge] });
            return console.log('\x1b[34m\x1b[2m', `[MEMBER LOGS 2/2]-- \x1b[1m${interaction}\x1b[0m\x1b[2m\x1b[34m ► Log sent in ${logChannel.name} channel`,'\x1b[0m');
          };
        };
      } catch (error) {
        console.log('\x1b[41m', `⌜ [ERROR SLASH CMD] \x1b[1m${interaction}\x1b[0m\x1b[41m ► ${interaction.user.tag} (${interaction.user.id}) in ${interaction.channel.name} ⌝`,'\x1b[0m');
        console.error(error);
        const imgBugHunter = new AttachmentBuilder("./src/database/img/bughunter.png");
        const button = new ButtonBuilder()
          .setEmoji(process.env.githubLogo)
          .setLabel("Créer un ticket GitHub") 
          .setStyle(ButtonStyle.Link)
          .setURL(`https://github.com/WaxenSs/Undoo-v14/issues/new?assignees=WaxenSs&labels=bug%2C+hunter&template=bug_report.md&title=[${client.user.username}]+${interaction.user.id}`);
        
        const replyEmbed = new EmbedBuilder()
        .setColor("#9366CD")
        .setAuthor({ name: "On dirait que tu viens de trouver un bug !", iconURL: "attachment://bughunter.png" })
        .setDescription(`Copie la référence ci-dessous si tu souhaites créer un ticket sur GitHub.\nPour te remercier de ton aide, tu bénéficeras du rôle <@&${process.env.bugHunter}> !`)
        .addFields({ name: 'Référence:', value: `\`\`\`${error}\`\`\``, inline: true })
        .setTimestamp();
        await interaction.reply({ embeds: [replyEmbed], files: [imgBugHunter], components: [new ActionRowBuilder().addComponents(button)],ephemeral: true });
        console.log('\x1b[33m', `[ERROR SLASH CMD 1/2]- \x1b[1m${interaction}\x1b[0m\x1b[33m ► Ephemeral answer sent to ${interaction.user.tag} (${interaction.user.id}) in ${interaction.channel.name}`,'\x1b[0m');

        const logEmbed = new EmbedBuilder()
        .setColor("#9366CD")
        .setAuthor({ name: "BUGS LOGS", iconURL: "attachment://bughunter.png"})
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(
          { name: "🚀 Commande", value: `\`${interaction}\``, inline: true },
          { name: "👤 Hunter", value: `${interaction.user}`, inline: true },
          { name: "📨 Salon", value: `${interaction.channel}`, inline: true }
        )
        .addFields({ name: '🛠 Référence', value: `\`\`\`${error}\`\`\``, inline: true })
        .setFooter({ text: interaction.user.id })
        .setTimestamp();
        await logChannel.send({ embeds: [logEmbed], files: [imgBugHunter] });
        console.log('\x1b[33m\x1b[2m', `[ERROR SLASH CMD 2/2]-- \x1b[1m${interaction}\x1b[0m\x1b[2m\x1b[33m ► Reference sent in ${logChannel.name} channel`,'\x1b[0m');

        return console.log('\x1b[41m', `⌞ [ERROR SLASH CMD] \x1b[1m${interaction}\x1b[0m\x1b[41m ► ${interaction.user.tag} (${interaction.user.id}) in ${interaction.channel.name} ⌟`,'\x1b[0m');
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error(`Button with customId ${customId} not found`);

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};