const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          `⏺ Loaded command: ${command.data.name} has been passed through the handler`
        );
      }
    }

    const { clientIdBrut, guildIdBrut } = process.env;

    const clientId = clientIdBrut;
    const guildId = guildIdBrut;
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log("🔄 Starting refreshing slash commands...");

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.commandArray,
      });

      console.log("✅ 🔄 Successfully refreshed slash commands!");
    } catch (error) {
      console.log(error);
    }
  };
};
