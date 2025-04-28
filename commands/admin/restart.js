const { SlashCommandBuilder, PermissionsBitField, } = require('discord.js');
const token = process.env.TOKEN;

// Create a new Discord client
const client = require('../../client');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('restart') // /ping
            .setDescription('Restart Sedé')
            .setDefaultMemberPermissions(PermissionsBitField.ADMINISTRATOR), // Only allow admin to use this slash command

    async execute(interaction) {
        await interaction.reply({
            content: '**🔄 [Restarting Sedé...]**'
        });

        setTimeout(() => {
            process.exit(0);
        }, 2000); // Disconnect the bot after 2s, Render should reconnect the bot.
    }
}