# discordify-selfbot

This project enables seamless integration between Discord and Spotify, allowing you to keep your Discord activity showing that you're listening to Spotify all the time. Follow the steps below to set it up.

## Prerequisites

Before running this project, make sure you have the following:

- Node.js ([Download Node.js](https://nodejs.org/))
- Discord account token (Follow the steps below to get the token.)
- Spotify API credentials ([Register an application with Spotify](https://developer.spotify.com/documentation/web-api/concepts/apps#register-your-app))
- A Spotify playlist ID (You can get this from the Spotify web app.)

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/oqzx/discordify-selfbot.git
    ```

2. Navigate to the project directory (Example):

    ```bash
    cd discord-spotify
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## How to get token?

<strong>Run this code: (Discord Console - [Ctrl + Shift + I])</strong>

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```

## Configuration

1. Create a `.env` file in the root directory based on the provided `.env.example`.
2. Populate the `.env` file with your Discord bot token, Spotify API credentials, and the playlist ID.

## Logger Configuration

The logger module allows you to control which types of logs are enabled. Modify the logger settings in `logger/logger.js` to customize the logging behavior. Set it to `true` to enable it and set it to `false` to disable it.

## Usage

1. Start it using:

    ```bash
    npm run start OR node index.js
    ```

2. Once started, your Discord account will log in and display the currently playing track from the specified Spotify playlist.

## Features

- Automatic refreshing of Spotify access token to ensure uninterrupted playback.
- Track shuffling to add variety to the playback, and to make it look more humanly.
- Error handling and logging for easy troubleshooting.
- Anti-crash mechanism.

## License

This project is licensed under the [MIT License](https://github.com/PikaNetworkTracker/pika-api.js/blob/main/README.md?plain=1).
