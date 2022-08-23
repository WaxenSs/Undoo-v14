const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("confession")
    .setDescription("Confesse-toi anonymement, aucune de tes informations apparaitront")
    .addStringOption((option) =>
      option
        .setName("confession")
        .setDescription("Celle-ci s'enverra dans le salon dédié aux confessions")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ fetchReply: true, ephemeral: true });
    const { options } = interaction;
    const confession = options.getString("confession");
    const key = Math.random() * 100;

    const confessionChannel = client.channels.cache.get(process.env.confessions);
    const confessionEmbed = new EmbedBuilder()
      .setColor("#536AFF")
      .setTitle("🫂 Confession anonyme")
      .setDescription(`> ${confession}`)
      .setFooter({ text: `Offense ou est contraire au règlement ? Merci d'ouvrir un ticket \nID: ${key}` })
      .setTimestamp();
    const message = await confessionChannel.send({ embeds: [confessionEmbed] });
    message.react("💪");
    message.react("❤️");
    message.react("🤣");
    message.react("😳");
    message.react("🥰");
    message.react("😏");
    message.react("🥺");
    message.react("🤯");

    await message.startThread({
      name: "Commentaires",
      autoArchiveDuration: 60
    });

    const gifSucess = new AttachmentBuilder("./src/database/img/tada.gif");
    const confirmationEmbed = new EmbedBuilder()
      .setColor("#43B17E")
      .setAuthor({ name: "Effectuée avec succès !", iconURL: "attachment://tada.gif" })
      .setDescription(`[Ta confession](${message.url}) à bien été envoyé __anonymement__ dans le salon <#${process.env.confessions}> !`);
    await interaction.editReply({ files: [gifSucess], embeds: [confirmationEmbed], ephemeral: true });

    const keyChannel = client.channels.cache.get(process.env.confidential);
    const keyEmbed = new EmbedBuilder()
      .setColor("#536AFF")
      .setTitle("🫂 Confession anonyme")
      .addFields(
        { name: "👤 Utilisateur ", value: `||${interaction.user.id}||`, inline: true },
        { name: "🔑 Key", value: `\`${key}\``, inline: true }
      );
    return keyChannel.send({ embeds: [keyEmbed] });
  },
};
