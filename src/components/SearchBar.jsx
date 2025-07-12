import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    onSearch(value); // Trigger parent callback
  };

  return (
    <input
      type="text"
      placeholder="Search: home, about, skills, etc..."
      value={query}
      onChange={handleSearch}
      style={{
        padding: '0.8rem',
        fontSize: '16px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
    />
  );
};

export default SearchBar;
