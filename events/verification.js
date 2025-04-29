const { Events, MessageFlags } = require('discord.js');
const verify = require('../lib/verify');
const idMapping = require('../data/idMapping');
const { selectRoleByCode } = require('../queries/roleQueries');

module.exports = {
    // Create an event listener for when a command is executed
    // The interactionCreate event fires the execute function and passes in a BaseInteraction object under the alias "interaction".
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Check if the button pressed is the verification button.
        if (interaction.isButton()) {
            if (interaction.customId === idMapping.openVerificationMenuBtnID) {
                
                const verifiedRoleId = (await selectRoleByCode({ code: 'verified_RID' })).role_id;

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
            if (interaction.customId === idMapping.verificationContinueBtnID) {
                await verify.showModal(interaction);
            }
        }

        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === idMapping.verificationCourseSelectID) {
                await verify.handleCourseSelect(interaction);
            }

            if (interaction.customId === idMapping.verificationRoleSelectID) {
                await verify.handleRoleSelect(interaction);
            }
        }

        if (interaction.isModalSubmit()) {
            if (interaction.customId === idMapping.verficiationModalID) {
                await verify.handleModalSubmit(interaction);
            }
        }
    },
};