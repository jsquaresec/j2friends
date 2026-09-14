const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin'),

    async execute(interaction) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

        const embed = new EmbedBuilder()
            .setColor(0xF1C40F)
            .setTitle('🪙 Coin Flip')
            .setDescription(`The coin landed on **${result}**.`)
            .setFooter({
                text: `Requested by ${interaction.user.username}`
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
