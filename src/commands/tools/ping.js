const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping-staff')
    .setDescription('Effectue un test de latence du bot'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
      fetchReply: true,
    });

    const imgBadge = new AttachmentBuilder("./src/database/img/badges/staff-badge.png");
    const pingEmbed = new EmbedBuilder()
      .setColor("#838CF6")
      .setAuthor({ name: `Latence de ${client.user.username}`, iconURL: "attachment://staff-badge.png" })
      .addFields(
        { name: "🗄 API Latency", value: `${client.ws.ping}ms`, inline: true },
        { name: "👥 Client Ping", value: `${message.createdTimestamp - message.createdTimestamp}ms`, inline: true }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: client.user.id })
      .setTimestamp();
    await interaction.editReply({ embeds: [pingEmbed], files: [imgBadge] });
  },
};