import React, { useState } from 'react';
import { FaHeart, FaBell, FaRegHeart } from 'react-icons/fa';

const Navbar = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [notifications, setNotifications] = useState(3);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <span style={styles.logo}>Kavyagram</span>
      </div>

      {/* Icons */}
      <div style={styles.iconsContainer}>
        {/* Like */}
        <div onClick={toggleLike} style={styles.iconWrapper}>
          {liked ? (
            <FaHeart size={22} color="red" />
          ) : (
            <FaRegHeart size={22} color="#fff" />
          )}
          <span style={styles.likeCount}>{likes}</span>
        </div>

        {/* Notification */}
        <div onClick={clearNotifications} style={styles.iconWrapper}>
          <FaBell size={22} color="#fff" />
          {notifications > 0 && (
            <span style={styles.notificationDot}>{notifications}</span>
          )}
        </div>
      </div>
    </nav>
  );
};

// Responsive styles
const styles = {
  nav: {
    backgroundColor: '#000',
    padding: '12px 16px',
    width: '100%',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontFamily: 'Billabong, Lobster, cursive',
    fontSize: '1.8rem',
    color: '#fff',
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  iconWrapper: {
    position: 'relative',
    cursor: 'pointer',
  },
  likeCount: {
    position: 'absolute',
    top: '-8px',
    right: '-12px',
    fontSize: '11px',
    color: '#fff',
    background: '#000',
    padding: '2px 4px',
    borderRadius: '8px',
  },
  notificationDot: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    fontSize: '10px',
    padding: '2px 6px',
    fontWeight: 'bold',
  },
};

export default Navbar;
