require('dotenv').config();

const {
    Client,
    GatewayIntentBits
} = require('discord.js');

const loadCommands = require('./handlers/commandHandler');
const loadLegacyCommands = require('./handlers/legacyCommandHandler');
const loadEvents = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

loadCommands(client);
loadLegacyCommands(client);
loadEvents(client);

client.login(process.env.DISCORD_TOKEN);
