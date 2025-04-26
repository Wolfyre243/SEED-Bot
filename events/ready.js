const { Events, ActivityType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle } = require('discord.js');
const verify = require('../lib/verify');

module.exports = {
    name: Events.ClientReady,
	once: true,
    // When the client is ready, run this code (only once).
    // The name of this function shouldn't matter
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('Send help pls', {
			type: ActivityType.Watching
		});

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
	},
}