//TrackList.js
import React from 'react';
import Track from './Track';

const TrackList = ({ tracks, onAdd }) => {
  return (
    <div className="TrackList">
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default TrackList;
