const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,

    async execute(message) {
        if (message.author.bot) return;
        if (!message.guild) return;

        const prefix = process.env.PREFIX || '!';

        if (!message.content.startsWith(prefix)) return;

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/\s+/);

        const commandName = args.shift()?.toLowerCase();
        if (!commandName) return;

        const command = message.client.legacyCommands?.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(`Legacy command ${commandName} failed:`, error);

            await message.reply('There was an error executing that command.');
        }
    }
};
