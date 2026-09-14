const { slashCommandBuilder } = require('discord.js');

module.exports = {
    data: new slashCommandBuilder()
        .setName('jsquare')
        .setDescription('The Real JSquare'),

    async execute(interaction) {
        await interaction.reply({
            content: `JSquare is the best!`,
            ephemeral: false
        });
    }
};