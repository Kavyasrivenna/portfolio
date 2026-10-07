// src/components/ReelsViewer.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import reelsData from './ReelsData';
import ReelItem from './ReelItem';
import profileAvatar from '../assets/1.jpg';
import {
  FaTimes,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';

const ReelsViewer = ({ onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeProgress, setActiveProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  // Scroll to index using the container's real clientHeight
  const scrollToIndex = useCallback((index) => {
    if (containerRef.current) {
      const slideHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: index * slideHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  const prevReel = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setActiveProgress(0);
      setIsPlaying(true);
      scrollToIndex(prevIdx);
    }
  }, [currentIndex, scrollToIndex]);

  const nextReel = useCallback(() => {
    if (currentIndex < reelsData.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setActiveProgress(0);
      setIsPlaying(true);
      scrollToIndex(nextIdx);
    }
  }, [currentIndex, scrollToIndex]);

  const handleVideoEnded = useCallback(() => {
    if (currentIndex < reelsData.length - 1) {
      nextReel();
    }
  }, [currentIndex, nextReel]);

  // Accurate active index detection based on container clientHeight
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const slideHeight = containerRef.current.clientHeight;
      if (slideHeight > 0) {
        const index = Math.round(scrollTop / slideHeight);
        if (index !== currentIndex && index >= 0 && index < reelsData.length) {
          setCurrentIndex(index);
          setActiveProgress(0);
          setIsPlaying(true);
        }
      }
    }
  };

  // Debounced mouse wheel scrolling
  const handleWheel = (e) => {
    if (isScrollingRef.current) return;
    if (Math.abs(e.deltaY) > 25) {
      if (e.deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }
      isScrollingRef.current = true;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 550);
    }
  };

  // Touch swipe gestures
  const handleTouchStart = (e) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartYRef.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartYRef.current - touchEndY;
    if (Math.abs(deltaY) > 45) {
      if (deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }
    }
    touchStartYRef.current = null;
  };

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'k') {
        e.preventDefault();
        prevReel();
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'j') {
        e.preventDefault();
        nextReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, prevReel, nextReel]);

  return (
    <div style={styles.outerStage}>
      {/* Centered Reel Card Wrapper */}
      <div
        style={{
          ...styles.cardFrame,
          maxWidth: isMobile ? '100%' : '430px',
          height: isMobile ? 'calc(100dvh - 60px)' : 'min(820px, calc(100vh - 84px))',
          borderRadius: isMobile ? '0px' : '22px',
          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isMobile ? 'none' : '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Top Overlay: Segmented Progress Bar + Profile Avatar + Reel Counter + Close */}
        <div style={styles.topOverlay} onClick={(e) => e.stopPropagation()}>
          {/* Segmented Instagram-style progress bars */}
          <div style={styles.segmentedProgressRow}>
            {reelsData.map((_, idx) => {
              let fillPct = 0;
              if (idx < currentIndex) fillPct = 100;
              else if (idx === currentIndex) fillPct = activeProgress;
              else fillPct = 0;

              return (
                <div key={idx} style={styles.progressTrackSegment}>
                  <div
                    style={{
                      ...styles.progressBarFill,
                      width: `${fillPct}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Header Row: Profile Info | Counter | Close */}
          <div style={styles.headerRow}>
            {/* Left: Avatar & Creator Info */}
            <div style={styles.profileBadge}>
              <img
                src={profileAvatar}
                alt="Kavya Sri Venna"
                style={styles.avatarImg}
              />
              <div style={styles.profileText}>
                <span style={styles.username}>@kavyasrivenna</span>
                <span style={styles.roleBadge}>Creator</span>
              </div>
            </div>

            {/* Center / Right: Counter & Close */}
            <div style={styles.headerRightGroup}>
              <div style={styles.counterBadge}>
                <span>{currentIndex + 1} / {reelsData.length}</span>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  style={styles.closeBtn}
                  aria-label="Close reels viewer"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Snap Reel Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={styles.reelScrollContainer}
          className="snap-y snap-mandatory scroll-smooth hide-scrollbar"
        >
          {reelsData.map((reel, index) => (
            <div
              key={reel.id || index}
              style={styles.reelSlide}
              className="snap-start"
            >
              <ReelItem
                reel={reel}
                isActive={index === currentIndex}
                isMuted={isMuted}
                toggleMute={toggleMute}
                isPlaying={isPlaying}
                onPlayPauseToggle={togglePlayPause}
                onVideoEnded={handleVideoEnded}
                onTimeUpdateProgress={(pct) => {
                  if (index === currentIndex) setActiveProgress(pct);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Relative Navigation Arrow Controls (nestled right next to centered reel) */}
      {!isMobile && (
        <div style={styles.desktopNavWrapper} aria-label="Desktop reel navigation">
          <button
            onClick={prevReel}
            disabled={currentIndex === 0}
            style={{
              ...styles.desktopNavBtn,
              opacity: currentIndex === 0 ? 0.25 : 1,
              cursor: currentIndex === 0 ? 'default' : 'pointer',
            }}
            aria-label="Previous reel"
            title="Previous reel (Up arrow)"
          >
            <FaChevronUp size={15} />
          </button>

          <button
            onClick={nextReel}
            disabled={currentIndex === reelsData.length - 1}
            style={{
              ...styles.desktopNavBtn,
              opacity: currentIndex === reelsData.length - 1 ? 0.25 : 1,
              cursor: currentIndex === reelsData.length - 1 ? 'default' : 'pointer',
            }}
            aria-label="Next reel"
            title="Next reel (Down arrow)"
          >
            <FaChevronDown size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  outerStage: {
    position: 'relative',
    width: '100%',
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0.5rem',
    overflow: 'hidden',
  },
  cardFrame: {
    position: 'relative',
    width: '100%',
    maxWidth: '430px',
    height: 'min(820px, calc(100vh - 80px))',
    backgroundColor: '#09090b',
    borderRadius: '22px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 0, 0, 0.6)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    padding: '12px 14px 6px',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
    pointerEvents: 'auto',
  },
  segmentedProgressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: '100%',
    marginBottom: '10px',
  },
  progressTrackSegment: {
    flex: 1,
    height: '2.5px',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '9999px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ec4899, #a855f7)',
    borderRadius: '9999px',
    transition: 'width 0.1s linear',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  profileBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatarImg: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1.5px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
  },
  profileText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  username: {
    color: '#fff',
    fontSize: '12.5px',
    fontWeight: '700',
    letterSpacing: '-0.2px',
    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
  },
  roleBadge: {
    fontSize: '9.5px',
    fontWeight: '600',
    color: '#f472b6',
    backgroundColor: 'rgba(236, 72, 153, 0.18)',
    border: '1px solid rgba(236, 72, 153, 0.35)',
    padding: '1px 6px',
    borderRadius: '9999px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  headerRightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  counterBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '9999px',
    color: '#fff',
    padding: '4px 10px',
    fontSize: '11.5px',
    fontWeight: '600',
    backdropFilter: 'blur(8px)',
  },
  closeBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    color: '#fff',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'background-color 0.15s, transform 0.15s',
  },
  reelScrollContainer: {
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
    backgroundColor: '#000',
    position: 'relative',
  },
  reelSlide: {
    scrollSnapAlign: 'start',
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desktopNavWrapper: {
    position: 'absolute',
    left: 'calc(50% + 235px)',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  desktopNavBtn: {
    backgroundColor: 'rgba(24, 24, 27, 0.75)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: '#fff',
    borderRadius: '50%',
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
    transition: 'background-color 0.15s, transform 0.15s, opacity 0.15s',
  },
};

export default ReelsViewer;
