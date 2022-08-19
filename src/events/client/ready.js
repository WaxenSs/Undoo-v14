const { ActivityType, EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log('\x1b[34m',`[BOOT 1/2]- \x1b[1m${client.user.tag} just booted!`,'\x1b[0m');

    client.user.setPresence({
      activities: [{ name: `tes commandes ✨`, type: ActivityType.Watching }],
      status: "online",
    });

    const logChannel = client.channels.cache.get(process.env.logs);
    const imgBadge = new AttachmentBuilder("./src/database/img/badges/bot-badge.png");
    const logEmbed = new EmbedBuilder()
      .setColor("#9279E2")
      .setAuthor({ name: "BOT LOGS", iconURL: "attachment://bot-badge.png" })
      .addFields(
        { name: "🤖 Client", value: `${client.user}`, inline: true },
        { name: "🛠 Statut", value: "Boot effectué", inline: true }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: client.user.id })
      .setTimestamp();
    await logChannel.send({ embeds: [logEmbed], files: [imgBadge] });
    console.log('\x1b[34m\x1b[2m',`[BOOT 2/2]-- \x1b[1mBoot confirmation sent in ${logChannel.name} channel`,'\x1b[0m');

  },
};
