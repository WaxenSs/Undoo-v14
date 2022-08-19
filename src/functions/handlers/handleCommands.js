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
        console.log('\x1b[33m\x1b[2m',`[INITIALIZATION 1/3]- \x1b[1mLoaded command\x1b[0m\x1b[2m\x1b[33m ► \x1b[37m${command.data.name}\x1b[33m has been passed through the handler`,'\x1b[0m');
      }
    }
    
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    try {
      console.log('\x1b[33m\x1b[2m',"[INITIALIZATION 2/3]-- \x1b[1mRefreshing command\x1b[0m\x1b[2m\x1b[33m ► \x1b[33mStarting refreshing slash commands...",'\x1b[0m');

      await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), {
        body: client.commandArray,
      });

      console.log('\x1b[33m\x1b[2m',"[INITIALIZATION 3/3]--- \x1b[1mRefreshing command\x1b[0m\x1b[2m\x1b[33m ► \x1b[33mSuccessfully refreshed slash commands!",'\x1b[0m');
    } catch (error) {
      console.log(error);
    }
  };
};
