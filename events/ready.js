// Import Dependencies
const { Events, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const verify = require('../lib/verify');
const verificationConfig = require('../data/config.json')["verification"];
const presenceConfig = require('../data/config.json')["presence"];
const { verifyEmbed } = require('../data/embeds/verifiyEmbed');
const welcomeEmbed = require('../data/embeds/welcomeEmbed');
const GUILD_ID = process.env.GUILD_ID;

module.exports = {
    name: Events.ClientReady,
	once: true,
    // When the client is ready, run this code (only once).
    // The name of this function shouldn't matter
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

        const logChannelId = require("../data/config.json").logChannelId;
        const logChannel = await client.channels.fetch(logChannelId);
        logChannel.send(`Ready! <@${client.user.id}> is now **ONLINE**`);
        
		client.user.setActivity(presenceConfig["statusMsg"], {
			type: ActivityType.Competing
		});

        const verifyChannel = await client.channels.fetch(verificationConfig["verifyChannel"]);

        let fetched;
        do {
            fetched = await verifyChannel.messages.fetch({ limit: 100 });
            await verifyChannel.bulkDelete(fetched);
        } while (fetched.size > 1);
        
        const messages = await verifyChannel.messages.fetch();

        if (messages.size === 0) {
            verifyChannel.send({
                embeds:
                    [verifyEmbed],

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

        client.on(Events.InteractionCreate, async (interaction) => {
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
                    await verify.handleModalSubmit(interaction, client);
                }
            }
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
	},
}