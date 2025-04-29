//------------------------------Declare Variables------------------------------------
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const app = require('./server/app'); // Express server

const token = process.env.TOKEN;

// Import client from client.js
const client = require('./client');

//---------------------------------Main Script----------------------------------------

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Reads the path to the directory and returns an array of files.

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath); // Require the command file and store it in the command variable

        // Set a new item in the Collection
        if ('data' in command && 'execute' in command) { // Check if the command was written properly
            client.commands.set(command.data.name, command) // The key is the command name and the value is the imported module.
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath); // Require the event file and store it in the event variable

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        // e.g. client.on(Events.InteractionCreate, async interaction => {...}); where interaction is ...args
    }
}

// client.on("ready", async () => {
// 	console.log("The bot is ready");

// 	const channel = await client.channels.fetch('1365607323866890351');

// 	let fetched;
// 	do {
// 		fetched = await channel.messages.fetch({ limit: 100 });
// 		await channel.bulkDelete(fetched);
// 	} while (fetched.size > 1);
	
// 	const messages = await channel.messages.fetch();

// 	if (messages.size === 0) {
// 		channel.send({
// 			components: [
// 				new ActionRowBuilder().addComponents(
// 					new ButtonBuilder()
// 					.setCustomId("open-menu")
// 					.setLabel("Verify")
// 					.setStyle(ButtonStyle.Success),
// 				),
// 			],
// 		});
// 	}

// 	client.on("interactionCreate", async (interaction) => {
// 		if (interaction.isButton()) {
// 			if (interaction.customId === "open-menu") {
// 				await verify.startVerification(interaction);
// 			}
// 			if (interaction.customId === "continue-button") {
// 				await verify.showModal(interaction);
// 			}
// 		}

// 		if (interaction.isStringSelectMenu()) {
// 			if (interaction.customId === "course-select") {
// 				await verify.handleCourseSelect(interaction);
// 			}

// 			if (interaction.customId === "role-select") {
// 				await verify.handleRoleSelect(interaction);
// 			}
// 		}

// 		if (interaction.isModalSubmit()) {
// 			if (interaction.customId === "verify-modal") {
// 				await verify.handleModalSubmit(interaction);
// 			}
// 		}
// 	});
// });

// Log in to Discord with your client's token
client.login(token);

// Start the express server
app.listen(process.env.PORT, () => {
    console.log(`[INFO] SEDE Server systems online!`);
})