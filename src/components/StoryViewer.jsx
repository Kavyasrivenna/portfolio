import React, { useEffect, useRef, useState } from 'react';
import { stories } from './stories';

const StoryViewer = ({ startingIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startingIndex);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    startProgress();
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const startProgress = () => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    setProgress(0);

    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / 5000) * 100, 100);
      setProgress(percent);
    }, 50);

    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTap = (e) => {
    const x = e.clientX;
    const screenWidth = window.innerWidth;
    if (x < screenWidth / 2) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
  };

  return (
    <div
      style={styles.overlay}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Fullscreen click layer for tap detection */}
      <div style={styles.clickLayer} onClick={handleTap}></div>

      {/* Progress bar */}
      <div style={styles.progressBarContainer}>
        {stories.map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.progressSegment,
              background:
                i < currentIndex
                  ? '#fff'
                  : i === currentIndex
                  ? `linear-gradient(to right, #ff6a00, #ee0979)`
                  : 'rgba(255,255,255,0.3)',
              width: i === currentIndex ? `${progress}%` : '100%',
            }}
          />
        ))}
      </div>

      {/* Story content */}
      <div style={styles.storyWrapper}>{stories[currentIndex].component}</div>

      {/* Close button */}
      <button onClick={onClose} style={styles.closeButton}>✕</button>
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
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 9999,
  },
  clickLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  progressBarContainer: {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    right: '0.5rem',
    height: '4px',
    display: 'flex',
    gap: '4px',
    zIndex: 10001,
  },
  progressSegment: {
    height: '100%',
    borderRadius: '2px',
    backgroundColor: '#444',
    transition: 'width 0.2s ease',
    flex: 1,
  },
  storyWrapper: {
    maxWidth: '500px',
    width: '100%',
    zIndex: 10000,
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    zIndex: 10002,
  },
};

export default StoryViewer;
