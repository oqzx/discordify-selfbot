process.emitWarning = (warning, type, code, ctor) => type !== 'DeprecationWarning' || !warning.includes('punycode') && originalProcessEmitWarning(warning, type, code, ctor);

require('dotenv').config();
const { client } = require('./discord/client.js');
const { playPlaylist } = require('./spotify/player.js');
const logger = require('./logger/logger.js');

client.on('ready', () => {
    logger.info('Discord', `${client.user.username} | ID: ${client.user.id} connected to Discord.`);
    playPlaylist();
});

process.on("uncaughtException", (err) => {
    console.log(err);
})
process.on('unhandledRejection', (message, err) => {
    console.log(message, err);
});
process.on('uncaughtExceptionMonitor', (err) => {
    console.log(err);
});

client.login(process.env.DISCORD_TOKEN);
