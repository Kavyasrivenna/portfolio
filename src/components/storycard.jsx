import React, { useEffect, useState } from 'react';
import Home from './home'; // Replace with your actual story component

const StoryCard = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const duration = 5000; // Duration in ms (5 seconds)

  useEffect(() => {
    let startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (percentage === 100) {
        clearInterval(interval);
        onClose(); // Auto-close after duration
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div style={styles.overlay}>
      <div style={styles.progressWrapper}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>
      <button onClick={onClose} style={styles.closeBtn}>✕</button>
      <div style={styles.content}>
        <Home />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#000',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
  },
  progressWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '4px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '2px',
    overflow: 'hidden',
    zIndex: 10000,
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(to right, #ff6a00, #ee0979)',
    transition: 'width 0.05s linear',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 10001,
  },
  content: {
    width: '100%',
    maxWidth: '500px',
    padding: '1rem',
    marginTop: '2rem',
  },
};

export default StoryCard;
