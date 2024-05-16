const SpotifyWebApi = require('spotify-web-api-node');
const { spotifyClientId, spotifyClientSecret } = require('../config/config.js');
const logger = require('../logger/logger.js');

const spotifyApiClient = new SpotifyWebApi({
    clientId: spotifyClientId,
    clientSecret: spotifyClientSecret,
});

async function authenticateWithSpotify() {
    try {
        const authData = await spotifyApiClient.clientCredentialsGrant();
        spotifyApiClient.setAccessToken(authData.body.access_token);
        logger.info('Spotify API', 'Successfully authenticated with Spotify API.');
        scheduleTokenRefresh(authData.body.expires_in);
        return spotifyApiClient;
    } catch (error) {
        logger.error('Spotify API', `Error authenticating with Spotify API: ${error}`);
        setTimeout(authenticateWithSpotify, 5000);
        return null;
    }
}

function scheduleTokenRefresh(expirationTimeInSeconds) {
    const refreshTime = (expirationTimeInSeconds * 0.9) * 1000;
    setTimeout(refreshToken, refreshTime);
}

async function refreshToken() {
    try {
        const authData = await spotifyApiClient.clientCredentialsGrant();
        spotifyApiClient.setAccessToken(authData.body.access_token);
        logger.debug('Spotify Auth', 'Successfully refreshed Spotify access token.');
        scheduleTokenRefresh(authData.body.expires_in);
    } catch (error) {
        logger.error('Spotify Auth', `Error refreshing Spotify access token: ${error}`);
        // Retry after a delay in case of failure
        setTimeout(refreshToken, 5000);
    }
}

module.exports = {
    authenticateWithSpotify,
};
