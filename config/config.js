require('dotenv').config();

module.exports = {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    playlistId: process.env.PLAYLIST_ID,
};
