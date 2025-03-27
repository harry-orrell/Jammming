
//Spotify.js

const clientId = '58f293c068094789ab9cb0d4bf903d35';
const redirectUri = 'http://localhost:3000/';
//const apiUrl = 'https://api.spotify.com/v1/me'; //supposed to take this out so it works when uploading to netify

const Spotify = {
  getAccessToken() {
    const accessToken = window.localStorage.getItem('access_token');
    const expirationTime = window.localStorage.getItem('expiration_time');
    
    // Check if token exists and if it is expired
    if (accessToken && expirationTime) {
      const currentTime = new Date().getTime();
      
      // If the token is still valid, return it
      if (currentTime < expirationTime) {
        return accessToken;
      }
      
      // If expired, clear the stored token and expiration time and prompt for reauthorization
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('expiration_time');
    }

    const tokenFromUrl = window.location.href.match(/access_token=([^&]*)/);
    const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    
    // If access token is found in the URL
    if (tokenFromUrl && expiresIn) {
      const accessToken = tokenFromUrl[1];
      const expirationTime = Number(expiresIn[1]) * 1000 + new Date().getTime();
      window.localStorage.setItem('access_token', accessToken);
      window.localStorage.setItem('expiration_time', expirationTime);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }

    // If no token, redirect to Spotify's authorization page
    window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public%20playlist-modify-private&redirect_uri=${redirectUri}`;
    return '';
  },

  search(query) {
    const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      return Promise.reject('No valid access token found.');
    }
    
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  // src/Spotify.js
savePlaylist(name, trackUris) {
    return new Promise((resolve, reject) => {  // Return a Promise
      if (!name || !trackUris.length) {
        reject('Invalid name or tracks');  // Reject if something is wrong
        return;
      }
  
      const accessToken = Spotify.getAccessToken();
      if (!accessToken) {
        reject('No access token found');  // Reject if no token
        return;
      }
  
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
  
      // Step 1: Create a new playlist
      fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: name,
          public: false // You can change this to true if you want the playlist to be public
        })
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
  
        // Step 2: Add tracks to the created playlist
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackUris
          })
        })
        .then(resolve)  // Resolve when finished
        .catch(reject);  // Reject if there's an error
      })
      .catch(reject);  // Reject if there's an error
    });
  }
  
};

export default Spotify;




