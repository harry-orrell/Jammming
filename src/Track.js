//Track.js
import React, { useState } from 'react';

const Track = ({ track, onAdd }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(track);
    setAdded(true);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button onClick={handleAdd} disabled={added}>
        {added ? 'Added' : 'Add'}
      </button>
    </div>
  );
};

export default Track;
