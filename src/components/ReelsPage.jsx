import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const ReelsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <SearchBar onSearch={setSearchQuery} />
      <SearchResults query={searchQuery} />
    </div>
  );
};

export default ReelsPage;
