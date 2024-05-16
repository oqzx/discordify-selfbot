process.emitWarning = (warning, type, code, ctor) => type !== 'DeprecationWarning' || !warning.includes('punycode') && originalProcessEmitWarning(warning, type, code, ctor);

require('dotenv').config();
const { client } = require('./src/discord/client.js');
const { playPlaylist } = require('./src/spotify/player.js');
const logger = require('./src/logger/logger.js');

client.on('ready', () => {
    logger.info('Discord', `${client.user.username} | ID: ${client.user.id} connected to Discord.`);
    playPlaylist();
});

client.login(process.env.DISCORD_TOKEN);
