//Playlist.js
import React, { useState } from 'react';

const Playlist = ({ name, tracks, onRemove, onSave }) => {
  const [playlistName, setPlaylistName] = useState(name);

  const handleRemove = (track) => {
    onRemove(track);
  };

  const handleSave = () => {
    onSave(playlistName, tracks.map(track => track.uri));
  };

  return (
    <div className="Playlist">
      <input
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <div className="TrackList">
        {tracks.map((track) => (
          <div key={track.id} className="Track">
            <div className="Track-information">
              <h3>{track.name}</h3>
              <p>{track.artist} | {track.album}</p>
            </div>
            <button onClick={() => handleRemove(track)}>Remove</button>
          </div>
        ))}
      </div>
      <button className="Playlist-save" onClick={handleSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
