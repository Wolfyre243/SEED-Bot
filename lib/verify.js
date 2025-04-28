// Import Dependencies
const {
  Client,
  GatewayIntentBits,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  ModalBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextInputBuilder,
  TextInputStyle,
  MessageFlags,
} = require("discord.js");

// Define variables
const token = process.env.TOKEN;
const verificationConfig = require("../data/config.json").verification;
const logChannelId = require("../data/config.json").logChannelId;

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let userData = [];

// ------------------------------------------------ MAIN FUNCTIONS ------------------------------------------------
// Start verification process
async function startVerification(interaction) {
    const userId = interaction.user.id;

    if (!userData.find(e => e.userId === userId)) {
        userData.push({ userId });
    }

    console.log("User cache:", userData);

    const courses = [
    { label: "DCITP", description: "Common ICT Programme", value: "DCITP" },
    { label: "DIT", description: "Information Technology", value: "DIT" },
    { label: "DAAA", description: "Applied AI & Analytics", value: "DAAA" },
    { label: "DCDF", description: "Cybersecurity & Digital Forensics", value: "DCDF" },
    ];

    const courseMenu = new StringSelectMenuBuilder()
    .setCustomId('course-select')
    .setPlaceholder("Select your course...")
    .addOptions(courses.map(course => 
        new StringSelectMenuOptionBuilder()
        .setLabel(course.label)
        .setDescription(course.description)
        .setValue(course.value)
        )
    );

    await interaction.reply({
    content: "Please select your course:",
    components: [new ActionRowBuilder().addComponents(courseMenu)],
    flags: MessageFlags.Ephemeral,
    });
}
  
// After course selected
async function handleCourseSelect(interaction) {
    const userId = interaction.user.id;

    await interaction.update({
        content: "✅ Course selected!",
        components: [],
        flags: MessageFlags.Ephemeral,
    });

    const selectedCourse = interaction.values[0];
    userData.find(e => e.userId === userId).course = selectedCourse;

    const roles = [
        { label: "Y1", description: "Year 1 Student", value: verificationConfig["yearRoles"][0] },
        { label: "Y2", description: "Year 2 Student", value: verificationConfig["yearRoles"][1] },
        { label: "Y3", description: "Year 3 Student", value: verificationConfig["yearRoles"][2] },
    ];

    const roleMenu = new StringSelectMenuBuilder()
        .setCustomId('role-select')
        .setPlaceholder("Select your year...")
        .addOptions(roles.map(role => 
        new StringSelectMenuOptionBuilder()
            .setLabel(role.label)
            .setDescription(role.description)
            .setValue(role.value)
        ));

    await interaction.followUp({
        content: "Now select your year:",
        components: [new ActionRowBuilder().addComponents(roleMenu)],
        flags: MessageFlags.Ephemeral,
    });
}
  
// After role selected
async function handleRoleSelect(interaction) {
    const userId = interaction.user.id;
    
    await interaction.update({
        content: "✅ Year selected!",
        components: [],
        flags: MessageFlags.Ephemeral,
    });

    const selectedRoleId = interaction.values[0]; 
    userData.find(e => e.userId === userId).roleId = selectedRoleId;

    const continueButton = new ButtonBuilder()
        .setCustomId("continue-button")
        .setLabel("Continue")
        .setStyle(ButtonStyle.Primary);

    await interaction.followUp({
        content: "Click continue to proceed.",
        components: [new ActionRowBuilder().addComponents(continueButton)],
        flags: MessageFlags.Ephemeral,
    });
}
  
// Modal for submitting name
async function showModal(interaction) {
    const modal = new ModalBuilder()
        .setCustomId("verify-modal")
        .setTitle("Verification");

    const nameInput = new TextInputBuilder()
        .setCustomId("name")
        .setLabel("Your full name")
        .setPlaceholder("E.g: POH JIA LE RAYN")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(nameInput));

    await interaction.showModal(modal);
}

// Handle Modal Submit
async function handleModalSubmit(interaction, client) {
    const userId = interaction.user.id;
    const user = userData.find(e => e.userId === userId);

    const name = interaction.fields.getTextInputValue('name');
    user.name = name;
    
    await interaction.reply({ 
        content: `Thanks, ${interaction.user}! You have been verified.`, 
        flags: MessageFlags.Ephemeral 
    });

    const member = interaction.member;
    try {
        const name = user.name;
        const roleId = user.roleId;
        const course = user.course;
        const verifiedRoleId = verificationConfig["verifiedRole"];

        await member.roles.add(roleId);
        await member.roles.add(verifiedRoleId);

        // Delete from cache
        userData.splice(userData.indexOf(user), 1);
        console.log("user cache:", userData);

        const logChannel = await client.channels.fetch(logChannelId);
        logChannel.send({ content: `**[VERIFICATION]** <@${userId}> NAME: **${name}** ROLE: **<@&${roleId}>** COURSE: **${course}**`, flags: [ 4096 ]});
        return;
    } catch (error) {
        console.error(`Failed to assign role:`, error)
    }
}

// Export functions
module.exports = {
    startVerification,
    handleCourseSelect,
    handleRoleSelect,
    showModal,
    handleModalSubmit
};
