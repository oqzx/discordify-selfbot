const { client, SpotifyRPC } = require('../discord/client.js');
const { authenticateWithSpotify } = require('./auth.js');
const { shuffleArray } = require('./utils.js');
const { playlistId } = require('../config/config.js');
const logger = require('../logger/logger.js');

let currentTrackIndex = 0;
let isShuffling = true;

async function playPlaylist() {
    const spotifyApiClient = await authenticateWithSpotify();
    try {
        const playlistTracks = await spotifyApiClient.getPlaylistTracks(playlistId);
        const tracks = playlistTracks.body.items;

        if (isShuffling) {
            shuffleArray(tracks);
        }

        for (let i = currentTrackIndex; i < tracks.length; i++) {
            currentTrackIndex = i;

            const track = tracks[i].track;
            const albumArtId = track.album.images[1].url.split('/').pop();
            const albumArt = `spotify:${albumArtId}`;

            const spotify = new SpotifyRPC(client)
                .setAssetsLargeImage(albumArt)
                .setAssetsLargeText(track.album.name)
                .setState(track.artists.map(artist => artist.name).join(', '))
                .setDetails(track.name)
                .setStartTimestamp(Date.now())
                .setEndTimestamp(Date.now() + track.duration_ms)
                .setSongId(track.id)
                .setAlbumId(track.album.id);

            client.user.setPresence({ activities: [spotify] });
            logger.debug('Track', `Now playing: ${track.name} by ${track.artists.map(artist => artist.name).join(', ')}.`);

            const skipChance = Math.random();
            if (skipChance <= 0.4) {
                logger.warn('Track', 'Skipping track...');
                break;
            }

            await new Promise(resolve => setTimeout(resolve, track.duration_ms));
        }

        playPlaylist();
    } catch (error) {
        logger.error('Track', `Error playing playlist: ${error}`);
    }
}

module.exports = {
    playPlaylist,
};
