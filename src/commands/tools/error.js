const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('error-staff')
    .setDescription('Simule une erreur pour vérifier le comportement du bot'),
    async execute(interaction) {
        const errorEmbed = new EmbedBuilder()
        .setAuthor({ name: "ERROR TEST" })
        .setDescription(`${errorlaunch.id}`)
        await interaction.reply({ embeds: [errorEmbed]});
  },
};