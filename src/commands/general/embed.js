const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Shows an example Discord embed'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x5865F2)

            .setTitle('Friends Bot')
            .setDescription(
                'This is an example embed showing how Discord embeds are built with discord.js.'
            )

            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL()
            })

            .addFields(
                {
                    name: 'Server',
                    value: interaction.guild.name,
                    inline: true
                },
                {
                    name: 'User',
                    value: `<@${interaction.user.id}>`,
                    inline: true
                },
                {
                    name: 'Status',
                    value: '🟢 Online',
                    inline: true
                },
                {
                    name: 'About',
                    value: 'You can add as many fields as you need here.'
                }
            )

            .setThumbnail(interaction.client.user.displayAvatarURL())

            .setFooter({
                text: 'J2 Friends',
                iconURL: interaction.client.user.displayAvatarURL()
            })

            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
