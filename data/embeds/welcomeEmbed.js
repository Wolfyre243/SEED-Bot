const { EmbedBuilder } = require('discord.js');

const welcomeEmbed1 = new EmbedBuilder()
  .setTitle("About SEED")
  .setDescription("SEED is a Student Interest Group (SIG) under SP School of Computing (SOC).\nIt stands for Sharing, Exploration, Enriching, and Development.\n\nWe’re best known for our \"How-To\" events — fun, peer-led sessions where students share and learn from each other on a wide range of topics, from school modules to programming skills and beyond!\n\nBesides our \"How-To\" sessions, SEED also organizes hackathons — exciting, hands-on events where students team up to build creative tech solutions. These hackathons are open to all skill levels and focus on learning, collaboration, and innovation.")
  .setColor("#10f500");

const welcomeEmbed2 = new EmbedBuilder()
.setTitle("What's Next?")
.setDescription("Thanks again for joining SEED's official discord, but now that you're here\n**WHATS NEXT?**")
.addFields(
{
    name: "✅ Verify Yourself",
    value: "Without being verified, you can't do much in the discord server. So do head to https://discord.com/channels/1364637664908935222/1365607323866890351 to **VERIFY YOURSELF**!",
    inline: false
},
{
    name: "🌱 Join SEED!",
    value: "You like what our student interest group does? \n**AND** you are interested to be apart of SEED's family?\nFret not! SEED is open for recruitment 24/7! \nJust head over to https://discord.com/channels/1364637664908935222/1365607323866890351 where you can just fill up a form to join! DM a advisor to let them know as well.",
    inline: false
},
)
.setColor("#10fe00")
.setFooter({
text: "Sent by Sedé",
iconURL: "https://raw.githubusercontent.com/Wolfyre243/SEED-Bot/refs/heads/wip/images/sede-logo.png",
})
.setTimestamp();

module.exports = {
    welcomeEmbed1, welcomeEmbed2
}