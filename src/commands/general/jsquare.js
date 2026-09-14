const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jsquare')
        .setDescription('The Real JSquare'),

    async execute(interaction) {
        await interaction.reply({
            content: 'JSquare is the best!',
            ephemeral: false
        });
    }
};
