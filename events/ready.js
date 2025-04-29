// Import Dependencies
const { Events, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, } = require('discord.js');
const verify = require('../lib/verify');
const verificationConfig = require('../data/config.json')["verification"];
const presenceConfig = require('../data/config.json')["presence"];
const { verifyEmbed } = require('../data/embeds/verifiyEmbed');

module.exports = {
    name: Events.ClientReady,
	once: true,
    // When the client is ready, run this code (only once).
    // The name of this function shouldn't matter
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

        // TODO: shld be fetching from DB
        const logChannelId = require("../data/config.json").logChannelId;
        const logChannel = await client.channels.fetch(logChannelId);
        logChannel.send(`Ready! <@${client.user.id}> is now **ONLINE**`);
        
		client.user.setActivity(presenceConfig["statusMsg"], {
			type: ActivityType.Competing
		});

        verify.mainVerification(client);
	},
}