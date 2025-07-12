import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    onSearch(value); // Trigger parent callback
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
      <input
        type="text"
        placeholder="🔍 Search: home, about, skills, etc..."
        value={query}
        onChange={handleSearch}
        style={{
          padding: '1rem 1.5rem',
          fontSize: '1rem',
          width: '90%',
          maxWidth: '500px',
          borderRadius: '9999px',
          border: '2px solid #ff4d97',
          background: 'linear-gradient(145deg, #1c1c1c, #292929)',
          color: '#fff',
          outline: 'none',
          boxShadow: '0 0 15px rgba(255, 77, 151, 0.4)',
          transition: 'all 0.3s ease-in-out',
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow = '0 0 20px rgba(255, 77, 151, 0.7)')
        }
        onBlur={(e) =>
          (e.target.style.boxShadow = '0 0 15px rgba(255, 77, 151, 0.4)')
        }
      />
    </div>
  );
};

export default SearchBar;
