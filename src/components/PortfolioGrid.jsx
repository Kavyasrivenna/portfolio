import React from 'react';
import PortfolioCard from './PortfolioCard';

const sections = [
  'Home',
  'About',
  'Skills',
  'Projects',
  'Certificates',
  'Experience',
  'Contact',
];

const PortfolioGrid = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        padding: '10px',
        backgroundColor: '#000',
        minHeight: '100vh',
      }}
    >
      {sections.map((section) => (
        <PortfolioCard key={section} title={section} />
      ))}
    </div>
  );
};

export default PortfolioGrid;
