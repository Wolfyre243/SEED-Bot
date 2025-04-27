const { Client, GatewayIntentBits, SlashCommandBuilder, PermissionsBitField, } = require('discord.js');
const token = process.env.TOKEN;

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
            .setName('restart') // /ping
            .setDescription('Restart Sedé')
            .setDefaultMemberPermissions(PermissionsBitField.ADMINISTRATOR), // Only allow admin to use this slash command

    async execute(interaction) {
        await interaction.reply({
            content: '**🔄 [Restarting Sedé...]**'
        });

        // Disconnect bot from Discord
        await client.destroy();

        // Re-initialize the bot
        await client.login(token);

        // Send confirmation to same channel
        await interaction.channel.send({
            content: '**✅ [Sedé restarted]**'
        })
    }
}