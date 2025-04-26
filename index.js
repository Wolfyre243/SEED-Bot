//------------------------------Declare Variables------------------------------------
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// const app = require('./app'); // Express server

const token = process.env.TOKEN;

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//---------------------------------Main Script----------------------------------------

client.on("ready", async () => {
	console.log("The bot is ready");

	const channel = await client.channels.fetch('1364637665571373256');
	const messages = await channel.messages.fetch();

	if (messages.size === 0) {
		channel.send({
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
					.setCustomId("open-modal")
					.setLabel("Verify")
					.setStyle(ButtonStyle.Success),
				),
			],
		});
	}
});

// Log in to Discord with your client's token
client.login(token);