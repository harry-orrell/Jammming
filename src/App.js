

// src/App.js
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import TrackList from './TrackList';
import Playlist from './Playlist';
import Spotify from './Spotify';
import './App.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state

  const search = (query) => {
    Spotify.search(query).then((tracks) => setSearchResults(tracks));
  };

  const addTrack = (track) => {
    if (!playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter((savedTrack) => savedTrack.id !== track.id));
  };

  const savePlaylist = (name, trackUris) => {
    setLoading(true);  // Start loading when saving
    Spotify.savePlaylist(name, trackUris).then(() => {
      setLoading(false);  // Stop loading after the playlist is saved
      setPlaylistName('My Playlist');
      setPlaylistTracks([]);
    }).catch((error) => {
      setLoading(false);  // Stop loading in case of an error
      console.error('Error saving playlist:', error);
    });
  };

  return (
    <div>
      <h1>Jammming.</h1>
      <SearchBar onSearch={search} />
      <div className="App-playlist">
        <TrackList tracks={searchResults} onAdd={addTrack} />
        <Playlist
          name={playlistName}
          tracks={playlistTracks}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
      </div>

      {loading && (
        <div className="loading-screen">
          <h2>Saving your playlist...</h2>
        </div>
      )}
    </div>
  );
};

export default App;




