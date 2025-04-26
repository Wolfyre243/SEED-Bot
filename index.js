//------------------------------Declare Variables------------------------------------
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle } = require('discord.js');
const verify = require('./verify')

// const app = require('./app'); // Express server

const token = process.env.TOKEN;

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//---------------------------------Main Script----------------------------------------

client.on("ready", async () => {
	console.log("The bot is ready");

	const channel = await client.channels.fetch('1365607323866890351');

	let fetched;
	do {
		fetched = await channel.messages.fetch({ limit: 100 });
		await channel.bulkDelete(fetched);
	} while (fetched.size > 1);
	
	const messages = await channel.messages.fetch();

	if (messages.size === 0) {
		channel.send({
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
					.setCustomId("open-menu")
					.setLabel("Verify")
					.setStyle(ButtonStyle.Success),
				),
			],
		});
	}

	client.on("interactionCreate", async (interaction) => {
		if (interaction.isButton()) {
			if (interaction.customId === "open-menu") {
				await verify.startVerification(interaction);
			}
			if (interaction.customId === "continue-button") {
				await verify.showModal(interaction);
			}
		}

		if (interaction.isStringSelectMenu()) {
			if (interaction.customId === "course-select") {
				await verify.handleCourseSelect(interaction);
			}

			if (interaction.customId === "role-select") {
				await verify.handleRoleSelect(interaction);
			}
		}

		if (interaction.isModalSubmit()) {
			if (interaction.customId === "verify-modal") {
				await verify.handleModalSubmit(interaction);
			}
		}
	});
});

// Log in to Discord with your client's token
client.login(token);