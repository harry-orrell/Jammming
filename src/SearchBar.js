//SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Search for a song, artist, or album"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );
};

export default SearchBar;
