require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {
    REST,
    Routes
} = require('discord.js');

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const categories = fs.readdirSync(commandsPath);

for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);

    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const commandFiles = fs
        .readdirSync(categoryPath)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(categoryPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        }
    }
}

const rest = new REST({ version: '10' })
    .setToken(process.env.DISCORD_TOKEN);

const scope = process.argv[2];

(async () => {
    try {
        if (scope === 'global') {
            console.log(`Deploying ${commands.length} global slash commands...`);

            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands }
            );

            console.log('Global slash commands deployed.');
        } else if (scope === 'guild') {
            if (!process.env.GUILD_ID) {
                throw new Error('GUILD_ID is missing from .env');
            }

            console.log(`Deploying ${commands.length} guild slash commands...`);

            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),
                { body: commands }
            );

            console.log('Guild slash commands deployed.');
        } else {
            console.log('Usage:');
            console.log('npm run deploy:guild');
            console.log('npm run deploy:global');
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
