const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = function loadLegacyCommands(client) {
    client.legacyCommands = new Collection();

    const legacyPath = path.join(__dirname, '..', 'legacy');

    if (!fs.existsSync(legacyPath)) {
        fs.mkdirSync(legacyPath, { recursive: true });
    }

    const files = fs
        .readdirSync(legacyPath)
        .filter(file => file.endsWith('.js'));

    for (const file of files) {
        const filePath = path.join(legacyPath, file);
        const command = require(filePath);

        if (!command.name || typeof command.execute !== 'function') {
            console.warn(`Legacy command ${filePath} is missing a name or execute function.`);
            continue;
        }

        client.legacyCommands.set(command.name.toLowerCase(), command);

        if (Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
                client.legacyCommands.set(alias.toLowerCase(), command);
            }
        }
    }

    console.log(`Loaded ${files.length} legacy commands.`);
};
