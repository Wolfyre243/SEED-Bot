const { Events } = require('discord.js');

module.exports = {
    // Create an event listener for when a command is executed
    // The interactionCreate event fires the execute function and passes in a BaseInteraction object under the alias "interaction".
	name: Events.InteractionCreate,
	async execute(interaction) {
        
		if (!interaction.isChatInputCommand()) return; // Filter out non-slash commands

        // Check if the command exists in the Collection made earlier.
		const command = interaction.client.commands.get(interaction.commandName);

        // End if the command isnt found
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

        // Try to execute the command and catch any errors if needed.
		try {
			await command.execute(interaction); // Perform the "execute" function in the command's module script
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) { // Interaction has already been replied to or deferred, show an error.
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};