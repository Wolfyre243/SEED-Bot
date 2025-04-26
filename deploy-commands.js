//------------------------------Declare Variables------------------------------------
require('dotenv').config()

const { REST, Routes} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const token = process.env.TOKEN;
const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;

//Constructing the REST module
const rest = new REST().setToken(token);

//---------------------------------Main Script----------------------------------------
// Grab all of the command folders in the commands directory
const commands = [];
const foldersPath = path.join(__dirname, 'commands'); // BARCMK1R/commands
const commandFolders = fs.readdirSync(foldersPath); // Returns an array of the folders in the commands directory

for (const folder of commandFolders) {
    // Grab all of the command files in the command folders
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Filter out the .js files.

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON()); // Grab the data property from each command to use the 
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Deploy commands
const deploy = async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // put() fully refreshes all commands in the server(guild) with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            { body: commands },
        );

        // If needed, body: [] will refresh the client/guild commands accordingly
        // Do this only if you have to clear any dupes

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);

    } catch (err) {
        console.error(err);
    }
}

deploy();