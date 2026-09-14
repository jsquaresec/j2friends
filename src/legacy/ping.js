module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Check if the bot is online.',

    async execute(message) {
        const latency = message.client.ws.ping;
        await message.reply(`🏓 Pong! ${latency}ms`);
    }
};
