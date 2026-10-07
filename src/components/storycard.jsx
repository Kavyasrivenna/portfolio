import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import profilePic from '../assets/1.jpg';

const StoryCard = ({
  stories = [],
  currentIndex = 0,
  onClose,
  onNavigateToSection,
  onIndexChange,
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const duration = 5000; // 5 seconds per story
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const pausedAtRef = useRef(0);

  const activeStory = stories[currentIndex] || stories[0];

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      if (onIndexChange) {
        onIndexChange(currentIndex + 1);
      }
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onIndexChange, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      if (onIndexChange) {
        onIndexChange(currentIndex - 1);
      }
    }
  }, [currentIndex, onIndexChange]);

  // Reset timer on index change
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = Date.now();
    pausedAtRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (isPaused) return;

      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(intervalRef.current);
        handleNext();
      }
    }, 40);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, isPaused, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  const pauseTimer = () => {
    setIsPaused(true);
    pausedAtRef.current = Date.now() - startTimeRef.current;
  };

  const resumeTimer = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now() - pausedAtRef.current;
  };

  if (!activeStory) return null;

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
      onMouseDown={pauseTimer}
      onMouseUp={resumeTimer}
      onTouchStart={pauseTimer}
      onTouchEnd={resumeTimer}
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${activeStory.title}`}
    >
      {/* Story Card Container */}
      <div
        style={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress Bars (Instagram-style multi-segment) */}
        <div style={styles.progressContainer}>
          {stories.map((s, idx) => {
            let width = '0%';
            if (idx < currentIndex) width = '100%';
            else if (idx === currentIndex) width = `${progress}%`;

            return (
              <div key={s.id || idx} style={styles.progressBarTrack}>
                <div
                  style={{
                    ...styles.progressBarFill,
                    width,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Story Header */}
        <div style={styles.header}>
          <div style={styles.userInfo}>
            <div style={styles.avatarBorder}>
              <img src={profilePic} alt="Kavya Sri" style={styles.avatar} />
            </div>
            <div>
              <div style={styles.authorRow}>
                <span style={styles.username}>kavyasrivenna</span>
                <span style={styles.categoryBadge}>{activeStory.category}</span>
              </div>
              <span style={styles.timestamp}>{activeStory.date || 'Active now'}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={styles.closeBtn}
            aria-label="Close story"
          >
            ✕
          </button>
        </div>

        {/* Tap areas for next/previous */}
        <div
          style={styles.tapLeft}
          onClick={handlePrev}
          aria-label="Previous story"
        />
        <div
          style={styles.tapRight}
          onClick={handleNext}
          aria-label="Next story"
        />

        {/* Story Media / Visual Banner */}
        <div style={styles.mediaContainer}>
          {activeStory.image ? (
            <img
              src={activeStory.image}
              alt={activeStory.title}
              style={styles.mediaImage}
            />
          ) : (
            <div style={styles.gradientBanner}>
              <span style={styles.bannerCategory}>{activeStory.category}</span>
              <h2 style={styles.bannerTitle}>{activeStory.title}</h2>
            </div>
          )}
        </div>

        {/* Story Content Details */}
        <div style={styles.detailsBody}>
          <h3 style={styles.storyTitle}>{activeStory.title}</h3>
          <p style={styles.storyDescription}>{activeStory.description}</p>

          {activeStory.highlights && activeStory.highlights.length > 0 && (
            <div style={styles.highlightsBox}>
              {activeStory.highlights.map((item, i) => (
                <div key={i} style={styles.highlightItem}>
                  <span style={styles.highlightBullet}>✦</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {activeStory.tags && activeStory.tags.length > 0 && (
            <div style={styles.tagsRow}>
              {activeStory.tags.map((tag, i) => (
                <span key={i} style={styles.tagBadge}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {activeStory.sectionId && (
            <button
              onClick={() => {
                if (onNavigateToSection) {
                  onNavigateToSection(activeStory.sectionId);
                } else {
                  onClose();
                  const el = document.getElementById(activeStory.sectionId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={styles.jumpBtn}
            >
              <span>Explore {activeStory.label} Section</span>
              <FaExternalLinkAlt size={12} />
            </button>
          )}
        </div>

        {/* Left / Right Nav Arrows (Desktop) */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            style={styles.navArrowLeft}
            aria-label="Previous story"
          >
            <FaChevronLeft size={16} />
          </button>
        )}

        {currentIndex < stories.length - 1 && (
          <button
            onClick={handleNext}
            style={styles.navArrowRight}
            aria-label="Next story"
          >
            <FaChevronRight size={16} />
          </button>
        )}
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
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    backdropFilter: 'blur(8px)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
    height: '90vh',
    maxHeight: '750px',
    backgroundColor: '#18181b',
    borderRadius: '16px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  progressContainer: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    right: '12px',
    display: 'flex',
    gap: '4px',
    zIndex: 20,
  },
  progressBarTrack: {
    flex: 1,
    height: '3px',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
    transition: 'width 0.05s linear',
  },
  header: {
    position: 'relative',
    zIndex: 20,
    marginTop: '22px',
    padding: '0.6rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarBorder: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    padding: '2px',
    background: 'conic-gradient(#f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  username: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
  },
  categoryBadge: {
    background: 'rgba(99, 102, 241, 0.25)',
    color: '#a5b4fc',
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '4px',
    border: '1px solid rgba(99, 102, 241, 0.4)',
  },
  timestamp: {
    color: '#9ca3af',
    fontSize: '11px',
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  tapLeft: {
    position: 'absolute',
    top: '70px',
    left: 0,
    width: '35%',
    bottom: '120px',
    zIndex: 10,
    cursor: 'pointer',
  },
  tapRight: {
    position: 'absolute',
    top: '70px',
    right: 0,
    width: '35%',
    bottom: '120px',
    zIndex: 10,
    cursor: 'pointer',
  },
  mediaContainer: {
    position: 'relative',
    height: '240px',
    width: '100%',
    backgroundColor: '#09090b',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gradientBanner: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, #3b82f6, #8b5cf6, #ec4899)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    textAlign: 'center',
  },
  bannerCategory: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '12px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '8px',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  detailsBody: {
    flex: 1,
    padding: '1.2rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
  },
  storyTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#f4f4f5',
    margin: 0,
  },
  storyDescription: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#d4d4d8',
    margin: 0,
  },
  highlightsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    padding: '0.8rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  highlightItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '0.82rem',
    color: '#e4e4e7',
    lineHeight: '1.4',
  },
  highlightBullet: {
    color: '#f59e0b',
    fontSize: '10px',
    marginTop: '2px',
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px',
  },
  tagBadge: {
    fontSize: '11px',
    color: '#818cf8',
    background: 'rgba(129, 140, 248, 0.1)',
    padding: '3px 8px',
    borderRadius: '12px',
  },
  jumpBtn: {
    marginTop: 'auto',
    padding: '0.7rem 1rem',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '0.88rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
    transition: 'transform 0.15s ease',
  },
  navArrowLeft: {
    position: 'absolute',
    left: '-54px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 30,
  },
  navArrowRight: {
    position: 'absolute',
    right: '-54px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 30,
  },
};

export default StoryCard;
