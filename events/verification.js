const { Events } = require('discord.js');
const verify = require('../lib/verify');
const idMapping = require('../data/idMapping');

module.exports = {
    // Create an event listener for when a command is executed
    // The interactionCreate event fires the execute function and passes in a BaseInteraction object under the alias "interaction".
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Check if the button pressed is the verification button.
        if (interaction.isButton()) {
            if (interaction.customId === idMapping.openVerificationMenuBtnID) {
                // TODO: Get role ID from DB
                const verifiedRoleId = verificationConfig['verifiedRole'];

                // Prevent user from verifying again
                if (interaction.member.roles.cache.has(verifiedRoleId)) {
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({
                            content: "✅ Already verified",
                            flags: MessageFlags.Ephemeral,
                        });
                    }
                    return;
                }
                
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
    },
};