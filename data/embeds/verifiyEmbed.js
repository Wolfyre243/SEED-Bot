const { EmbedBuilder } = require('discord.js');

const verifyEmbed = new EmbedBuilder()
  .setTitle("✅ VERIFY PANEL ✅")
  .setDescription("This control panel is for Project: **Sedé**\nClick on the ***Verify***  button below to get your **VERIFIED** role")
  .setColor("#10f500")
  .setFooter({
    text: "Sent by Sedé",
    iconURL: "https://raw.githubusercontent.com/Wolfyre243/SEED-Bot/refs/heads/wip/images/sede-logo.png",
  })
  .setTimestamp();

module.exports = {
    verifyEmbed
}