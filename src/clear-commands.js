require('dotenv').config();

const {
    REST,
    Routes
} = require('discord.js');

const rest = new REST({ version: '10' })
    .setToken(process.env.DISCORD_TOKEN);

const scope = process.argv[2];

(async () => {
    try {
        if (scope === 'guild') {
            console.log('Removing guild slash commands...');

            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                { body: [] }
            );

            console.log('Guild commands removed.');
        }

        else if (scope === 'global') {
            console.log('Removing global slash commands...');

            await rest.put(
                Routes.applicationCommands(
                    process.env.CLIENT_ID
                ),
                { body: [] }
            );

            console.log('Global commands removed.');
        }

        else {
            console.log('Usage:');
            console.log('node src/clear-commands.js guild');
            console.log('node src/clear-commands.js global');
        }

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
