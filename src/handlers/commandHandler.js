const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = function loadCommands(client) {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, '..', 'commands');
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
                client.commands.set(command.data.name, command);
            } else {
                console.warn(`Command ${filePath} is missing data or execute.`);
            }
        }
    }

    console.log(`Loaded ${client.commands.size} commands.`);
};
