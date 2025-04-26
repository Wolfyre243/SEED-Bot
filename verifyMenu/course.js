const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");

const data = {
  name: "course",
  description: "Your course",
};

async function run({ interaction }) {
  if (interaction.customId === "open-menu") {
    const courses = [
      {
        label: "DCITP",
        description: "Common ICT Programme",
        value: "dcitp",
      },
      {
        label: "DIT",
        description: "Information Technology",
        value: "dit",
      },
      {
        label: "DAAA",
        description: "Applied AI & Analytics",
        value: "daaa",
      },
      {
        label: "DCDF",
        description: "Cybersecurity & Digital Forensics",
        value: "dcdf",
      },
    ];

    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('course-select')
      .setPlaceholder("Select your course...")
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        courses.map((courses) =>
          new StringSelectMenuOptionBuilder()
            .setLabel(courses.label)
            .setDescription(courses.description)
            .setValue(courses.value)
        )
      );

    // Send the select menu
    const actionRow = new ActionRowBuilder().addComponents(selectMenu);

    const response = await interaction.reply({ components: [actionRow], withResponse: true });

    const collector = response.resource.message.createMessageComponentCollector({ ComponentType: ComponentType.StringSelect, time: 120_000 });

    collector.on('collect', async i => {
      const selection = i.values;
      await i.update({
        content: `${i.user} has selected ${selection}`,
        components: [],
      });
    });

  };
};

module.exports = { data, run };
