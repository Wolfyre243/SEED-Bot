const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('../../data/embeds/infoEmbed');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('info') // /ping
            .setDescription('Display Information about Sedé'),

    async execute(interaction) {
        await interaction.reply({
            embeds:
                [infoEmbed]
        });
    }
}