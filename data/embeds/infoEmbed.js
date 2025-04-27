const { EmbedBuilder } = require('discord.js');

const infoEmbed = new EmbedBuilder()
  .setTitle("**Sedé Information**")
  .setDescription("**Version**\n> v0.1.0-alpha\n\n**Purpose**\n> Sedé was created to simplify managing SEED SIG's Discord.\n\n**Creator**\n> <@261827068512174081> & <@711816730569211946>")
  .setColor("#10f500")
  .setFooter({
    text: "Sent by Sedé",
    iconURL: "https://raw.githubusercontent.com/Wolfyre243/SEED-Bot/refs/heads/wip/images/sede-logo.png",
  })
.setTimestamp();

module.exports = {
    infoEmbed
}