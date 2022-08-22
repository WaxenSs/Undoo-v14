const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Prédiction ludique, qui peut répondre à tes questions personnelles')
    .addStringOption(option =>
        option.setName('question')
              .setDescription("Question auquelle tu aimerais recevoir l'avis de la boule magique")
              .setRequired(true)),
  async execute(interaction) {
    const { options } = interaction;
    const question = options.getString("question");

    const replyBall = [
        "Essaye plus tard ⌛️", //réponses évasives (7) ⇣
        "Essaye encore 🌝",
        "Pas d'avis 🤧",
        "Je n'en sais rien 🥺",
        "C'est ton destin ✍️",
        "Une chance sur deux 🧿",
        "Repose ta question s'il te plait 🧐",
        "D'après moi, oui 😌", //réponses affirmatives (8) ⇣
        "C'est certain 🥳",
        "Absolument 😏",
        "Tu peux compter dessus 😉",
        "Sans aucun doute 😎",
        "Très probable 😊",
        "Oui 💛",
        "C'est bien parti ! 💪",
        "C'est non 😶", //réponses négatives (7) ⇣
        "🏃...🚪 *esquive la question*",
        "Je ne préfère pas y répondre... 🤐",
        "Peu probable 🤏",
        "Faut pas rêver 🥱",
        "N'y compte pas 💀",
        "Impossible 🤡"]
      const randomReply = replyBall[Math.floor(Math.random() * replyBall.length)];

    const embed8ball = new EmbedBuilder()
    .setAuthor({ name: `Question de ${interaction.user.tag} :`, iconURL: interaction.user.displayAvatarURL() })
    .setColor('#000000')
    .setDescription(`> ${question}`)
    .addFields({ name: '🎱  Réponse de 8-Ball :', value: `> ${randomReply}`, inline: true })
    await interaction.reply({ embeds: [embed8ball]});
  },
};