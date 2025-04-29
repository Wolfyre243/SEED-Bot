// Import Dependencies
const { Events, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, } = require('discord.js');
const verify = require('../lib/verify');
// const verificationConfig = require('../data/config.json')["verification"];
// const { verifyEmbed } = require('../data/embeds/verifiyEmbed');
const { selectChannelByCode } = require('../queries/channelQueries');

module.exports = {
    name: Events.ClientReady,
	once: true,
    // When the client is ready, run this code (only once).
    // The name of this function shouldn't matter
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

        const logChannelId = (await selectChannelByCode({ code: 'log_CID' })).channel_id;
        const logChannel = await client.channels.fetch(logChannelId);
        logChannel.send(`Ready! <@${client.user.id}> is now **ONLINE**`);
        
		client.user.setActivity("SEED SIG", {
			type: ActivityType.Competing
		});

        verify.mainVerification(client);
	},
}