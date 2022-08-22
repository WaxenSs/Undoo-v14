const {
  SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disquette")
    .setDescription("Envoie une disquette aléatoire"),
  async execute(interaction) {
    const disquettes = [
      "**n° 1 :**\n Ça te dise qu’on fasse un plan à 3 ?\n Toi, moi et le bonheur ? 🥴",
      "**n° 2 :**\n Maintenant que je te vois,\n je sais qui est responsable du réchauffement climatique... 🥵",
      "**n° 3 :**\n Excuse moi t'aurais pas un Doliprane ?\n Parce que ta beauté me donne mal à la tête 🤒",
      "**n° 4 :**\n Si tu étais un hamburger au McDonald's\n tu serais le McGnifique 🍔",
      "**n° 5 :**\n Tu savais que tu as 206 os à l'intérieur de ton corps ?\n Ça te dirait d'en avoir plus? 🧸",
      "**n° 6 :**\n Tu crois en l’amour au premier regard,\n ou tu veux que je repasse ? 🌝",
      "**n° 7 :**\n 7 milliards de sourires sur Terre,\n et pourtant, c’est le tien que je préfère 🌎",
      "**n° 8 :**\n Ton rythme cardiaque à l’air très bas,\n ça te dirait qu'on l’augmente ? 🖤",
      "**n° 9 :**\n Tes yeux sont comme IKEA,\n je me perds dedans 👁",
      "**n° 10 :**\n Sur 10 je te mettrais 9,\n car je suis le 1 qu’il te manque 1️⃣",
      "**n° 11 :**\n La météo ne prévoyait pas d’orage,\n pourtant j’ai eu le coup de foudre 🌩",
      "**n° 12 :**\n Je n’ai pas le permis pour pouvoir conduire une Fiat,\n mais j’ai le permis pour piloter ton Fiak 🤐",
      "**n° 13 :**\n Excuse moi mais je peux lasser tes chaussures ?\n Parce que je ne veux pas que tu tombes amoureux(se) de quelqu’un d’autre 👟",
      "**n° 14 :**\n Mes parents m’ont toujours dit qu’on pouvait devenir accro à la drogue,\n mais pourquoi m’ont-ils rien dit pour toi ? 🤨",
      "**n° 15 :**\n Je voulais te sortir une disquette,\n mais je n'ai rien dans la tête à part toi ☁️",
      "**n° 16 :**\n T'aurais pas de la crème ?\n Parceque tu me fais rougir 🧴",
      "**n° 17 :**\n Tu dois être essoufflé à force de courir dans mes rêves non ? 🤔",
      "**n° 18 :**\n Dis-moi, t'aurais pas de la Ventoline ?\n Parce que sans toi je n'arrive pas à respirer 🤧",
      "**n° 19 :**\n Est-ce que tu es un temps composé de l'indicatif ?\n Car tu es plus-que-parfait(e) 🤩",
      "**n° 20 :**\n Hier je sortais en pull, aujourd'hui je suis sorti en t-shirt\n et demain je sortirai peut-être avec toi ? 🫶"
    ];
    const randomDisquette = disquettes[Math.floor(Math.random() * disquettes.length)];

    const trumpetOrViolin = ["🎺", "🎻"];
    const randomTrumpetOrViolin = trumpetOrViolin[Math.floor(Math.random() * trumpetOrViolin.length)];

    const disquetteEmbed = new EmbedBuilder()
      .setColor('Random')
      .setTitle(`${randomTrumpetOrViolin} Disquette`)
      .setDescription(randomDisquette);
    await interaction.reply({ embeds: [disquetteEmbed] });
  },
};
