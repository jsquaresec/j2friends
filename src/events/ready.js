const {
    Events,
    ActivityType
} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        const activityTypes = {
            Playing: ActivityType.Playing,
            Streaming: ActivityType.Streaming,
            Listening: ActivityType.Listening,
            Watching: ActivityType.Watching,
            Competing: ActivityType.Competing
        };

        const activityType =
            activityTypes[process.env.PRESENCE_TYPE] ??
            ActivityType.Watching;

        client.user.setPresence({
            activities: [
                {
                    name: process.env.PRESENCE_TEXT || 'the server',
                    type: activityType
                }
            ],
            status: process.env.PRESENCE_STATUS || 'online'
        });

        console.log(`Logged in as ${client.user.tag}`);
        console.log(
            `Presence set to: ${process.env.PRESENCE_TYPE || 'Watching'} ${process.env.PRESENCE_TEXT || 'the server'}`
        );
    }
};
