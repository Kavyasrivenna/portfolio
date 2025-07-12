import React from 'react';
import { FaHome, FaSearch, FaPlusSquare, FaUser } from 'react-icons/fa';
import { BsCameraReelsFill } from 'react-icons/bs';

const Footer = ({ onNavigate }) => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#000',
        padding: '0.6rem 1rem',
        borderTop: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <button onClick={() => onNavigate('main')} style={navItemStyle}>
        <FaHome size={22} />
        <span style={labelStyle}>Home</span>
      </button>

      <button onClick={() => onNavigate('search')} style={navItemStyle}>
        <FaSearch size={22} />
        <span style={labelStyle}>Search</span>
      </button>

      <button onClick={() => alert('Add functionality coming soon!')} style={navItemStyle}>
        <FaPlusSquare size={22} />
        <span style={labelStyle}>Add</span>
      </button>

      <button onClick={() => onNavigate('reels')} style={navItemStyle}>
        <BsCameraReelsFill size={22} />
        <span style={labelStyle}>Reels</span>
      </button>

      <button onClick={() => alert('Profile functionality coming soon!')} style={navItemStyle}>
        <FaUser size={22} />
        <span style={labelStyle}>Profile</span>
      </button>
    </footer>
  );
};

const navItemStyle = {
  color: '#fff',
  background: 'none',
  border: 'none',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
};

const labelStyle = {
  fontSize: '10px',
  marginTop: '4px',
};

export default Footer;
