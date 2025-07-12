import React from 'react';

const PortfolioCard = ({ title }) => {
  return (
    <div
      style={{
        backgroundColor: '#222',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        color: '#fff',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.1rem',
      }}
    >
      {title}
    </div>
  );
};

export default PortfolioCard;
