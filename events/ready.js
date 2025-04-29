// Import Dependencies
const { Events, ActivityType } = require('discord.js');
const verify = require('../lib/verify');
const welcomeEmbed = require('../data/embeds/welcomeEmbed');
const GUILD_ID = process.env.GUILD_ID;
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

        client.on('guildMemberAdd', async member => {
            if (member.guild.id !== GUILD_ID) {
                return;
            }
        
            console.log('New member joined');
            member.send({
                content: "Welcome to SEED SIG's OFFICIAL DISCORD! 🌱",
                embeds: [welcomeEmbed.welcomeEmbed1, welcomeEmbed.welcomeEmbed2]
            })
        });

        verify.mainVerification(client);
	},
}