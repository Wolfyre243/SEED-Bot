const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('uptime') // /ping
            .setDescription("Shows Sedé's uptime"),

    async execute(interaction) {
        // Get the bot's uptime in ms
        const uptime = interaction.client.uptime;

        // Convert uptime to readable-format
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

        const uptimeString = `${days}day ${hours}hr ${minutes}min ${seconds}s`;

        // Send the uptime
        await interaction.reply({
            content: `Sedé's Uptime: **${uptimeString}**`,
        });
    }
}