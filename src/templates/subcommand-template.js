const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fun')
        .setDescription('Example command using subcommands')

        .addSubcommand(subcommand =>
            subcommand
                .setName('coinflip')
                .setDescription('Flip a coin')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('roll')
                .setDescription('Roll a six-sided die')
        )

        .addSubcommand(subcommand =>
            subcommand
                .setName('eightball')
                .setDescription('Ask the magic 8-ball a question')
                .addStringOption(option =>
                    option
                        .setName('question')
                        .setDescription('The question you want to ask')
                        .setRequired(true)
                )
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        // ==========================================
        // /fun coinflip
        // ==========================================
        if (subcommand === 'coinflip') {
            const result = Math.random() < 0.5
                ? 'Heads'
                : 'Tails';

            const embed = new EmbedBuilder()
                .setTitle('🪙 Coin Flip')
                .setDescription(`The coin landed on **${result}**.`)
                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }

        // ==========================================
        // /fun roll
        // ==========================================
        if (subcommand === 'roll') {
            const result = Math.floor(Math.random() * 6) + 1;

            const embed = new EmbedBuilder()
                .setTitle('🎲 Dice Roll')
                .setDescription(`You rolled a **${result}**.`)
                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }

        // ==========================================
        // /fun eightball
        // ==========================================
        if (subcommand === 'eightball') {
            const question =
                interaction.options.getString('question');

            const answers = [
                'Yes.',
                'No.',
                'Definitely.',
                'Probably.',
                'Probably not.',
                'Ask again later.',
                'Signs point to yes.',
                'Very doubtful.'
            ];

            const answer =
                answers[
                    Math.floor(Math.random() * answers.length)
                ];

            const embed = new EmbedBuilder()
                .setTitle('🎱 Magic 8-Ball')
                .addFields(
                    {
                        name: 'Question',
                        value: question
                    },
                    {
                        name: 'Answer',
                        value: answer
                    }
                )
                .setTimestamp();

            return interaction.reply({
                embeds: [embed]
            });
        }
    }
};
