module.exports = {
    data: {
        name: "bughunter"
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: "I am a bug hunter, I will find you bugs!"
        });
    }
}