// src/components/ReelItem.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaRegComment,
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaExternalLinkAlt,
  FaTimes,
  FaPaperPlane,
} from 'react-icons/fa';

const defaultComments = {
  'reel-1': [
    { user: 'alex_code', text: 'Clean weather animations and API integration! 🌦️' },
    { user: 'frontend_dev', text: 'Loved the dynamic weather icon switching.' },
  ],
  'reel-2': [
    { user: 'priya_tech', text: 'This portfolio UI is stunning! Clean dark mode.' },
    { user: 'sarah_ui', text: 'Instagram vibe combined with a developer CV is genius 🔥' },
  ],
  'reel-3': [
    { user: 'mobile_dev', text: 'Touch gestures feel super responsive and native!' },
  ],
  'reel-4': [
    { user: 'qa_engineer', text: 'Glad to see strong testing habits with Jest & RTL 👏' },
  ],
  'reel-5': [
    { user: 'figma_guru', text: 'High-fidelity micro-interactions look so polished.' },
  ],
  'reel-6': [
    { user: 'cloud_architect', text: 'Clean CI/CD deployment pipeline on Vercel!' },
  ],
};

const ReelItem = ({
  reel,
  isActive,
  isMuted,
  toggleMute,
  isPlaying,
  onPlayPauseToggle,
  onVideoEnded,
  onTimeUpdateProgress,
}) => {
  const videoRef = useRef(null);
  const backdropVideoRef = useRef(null);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes || 0);
  const [saved, setSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [playPulse, setPlayPulse] = useState(null); // 'play' | 'pause' | null
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsList, setCommentsList] = useState(
    defaultComments[reel.id] || [{ user: 'visitor', text: 'Great work!' }]
  );
  const [newComment, setNewComment] = useState('');

  const triggerToast = useCallback((msg) => {
    setToastText(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  }, []);

  // Sync video play/pause & mute with active state
  useEffect(() => {
    const video = videoRef.current;
    const backdrop = backdropVideoRef.current;

    if (!video) return;

    video.muted = isMuted;
    if (backdrop) backdrop.muted = true;

    if (isActive) {
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (backdrop) backdrop.play().catch(() => {});
            })
            .catch(() => {
              // Browser autoplay policy handler
            });
        }
      } else {
        video.pause();
        if (backdrop) backdrop.pause();
      }
    } else {
      video.pause();
      video.currentTime = 0;
      if (backdrop) {
        backdrop.pause();
        backdrop.currentTime = 0;
      }
      setShowCommentsModal(false);
    }
  }, [isActive, isPlaying, isMuted]);

  // Real playback progress update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      if (onTimeUpdateProgress && isActive) {
        onTimeUpdateProgress(pct);
      }
    }
  };

  const handleEnded = () => {
    if (onVideoEnded && isActive) {
      onVideoEnded();
    }
  };

  const handleCenterTap = (e) => {
    e.stopPropagation();
    onPlayPauseToggle();
    setPlayPulse(isPlaying ? 'pause' : 'play');
    setTimeout(() => setPlayPulse(null), 650);
  };

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      setLikesCount((c) => (next ? c + 1 : c - 1));
      if (next) triggerToast('❤️ Liked reel');
      return next;
    });
  };

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    setSaved((prev) => {
      const next = !prev;
      triggerToast(next ? '🔖 Saved to collection' : 'Removed from saved');
      return next;
    });
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareData = {
      title: `${reel.title} | Kavya Sri Venna`,
      text: reel.caption,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        triggerToast('Shared successfully!');
      } catch {
        // Share dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        triggerToast('🔗 Link copied to clipboard!');
      } catch {
        triggerToast('🔗 Link ready to share!');
      }
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList((prev) => [
      ...prev,
      { user: 'you', text: newComment.trim() },
    ]);
    setNewComment('');
  };

  return (
    <div
      style={styles.cardContainer}
      onClick={handleCenterTap}
      role="region"
      aria-label={reel.title || 'Portfolio Reel'}
    >
      {/* 1. Backdrop layer: Ambient blurred backdrop prevents distortion & awkward black bars */}
      <div style={styles.backdropLayer} aria-hidden="true">
        <video
          ref={backdropVideoRef}
          src={reel.src}
          style={styles.backdropVideo}
          playsInline
          muted
          loop
          preload="metadata"
        />
        <div style={styles.backdropBlurOverlay} />
      </div>

      {/* 2. Foreground crisp video: Preserves original aspect ratio without stretching */}
      <div style={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={reel.src}
          style={styles.foregroundVideo}
          playsInline
          preload="metadata"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />
      </div>

      {/* 3. Subtle Gradient Overlays for readable text */}
      <div style={styles.topGradient} aria-hidden="true" />
      <div style={styles.bottomGradient} aria-hidden="true" />

      {/* 4. Play/Pause Animated Pulse Indicator */}
      {playPulse && (
        <div style={styles.pulseWrapper} aria-hidden="true">
          <div style={styles.pulseCircle}>
            {playPulse === 'play' ? (
              <FaPlay size={32} color="#fff" style={{ marginLeft: '4px' }} />
            ) : (
              <FaPause size={32} color="#fff" />
            )}
          </div>
        </div>
      )}

      {/* 5. Persistent centered play button when paused */}
      {isActive && !isPlaying && !playPulse && (
        <div style={styles.pausedOverlay} aria-hidden="true">
          <div style={styles.pausedCircle}>
            <FaPlay size={28} color="#fff" style={{ marginLeft: '4px' }} />
          </div>
        </div>
      )}

      {/* 6. Toast Notification */}
      {showToast && (
        <div style={styles.toastContainer} role="status">
          <span style={styles.toastText}>{toastText}</span>
        </div>
      )}

      {/* 7. Bottom Content Overlay (Username, Title, Caption, Tags, CTA) */}
      <div style={styles.bottomContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.userRow}>
          <span style={styles.username}>@{reel.username || 'kavyasrivenna'}</span>
          <span style={styles.dotSeparator}>•</span>
          <span style={styles.dateBadge}>{reel.date || 'Recent'}</span>
        </div>

        <h3 style={styles.reelTitle}>{reel.title}</h3>

        <p style={styles.reelCaption}>{reel.caption}</p>

        {reel.hashtags && (
          <p style={styles.hashtags}>{reel.hashtags}</p>
        )}

        {reel.github && (
          <a
            href={reel.github}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.viewProjectBtn}
            aria-label={`View code for ${reel.title}`}
          >
            <span>View Project</span>
            <FaExternalLinkAlt size={10} />
          </a>
        )}
      </div>

      {/* 8. Right-Side Action Controls */}
      <div style={styles.rightActionsColumn} onClick={(e) => e.stopPropagation()}>
        {/* Like Button */}
        <button
          onClick={handleLikeToggle}
          style={styles.actionBtn}
          aria-label={liked ? 'Unlike reel' : 'Like reel'}
        >
          <div style={{ ...styles.iconCircle, color: liked ? '#ef4444' : '#fff' }}>
            {liked ? (
              <FaHeart size={24} style={{ filter: 'drop-shadow(0 2px 8px rgba(239,68,68,0.5))' }} />
            ) : (
              <FaRegHeart size={24} />
            )}
          </div>
          <span style={styles.actionLabel}>{likesCount}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={() => setShowCommentsModal(true)}
          style={styles.actionBtn}
          aria-label="View comments"
        >
          <div style={styles.iconCircle}>
            <FaRegComment size={23} />
          </div>
          <span style={styles.actionLabel}>{commentsList.length}</span>
        </button>

        {/* Save / Bookmark Button */}
        <button
          onClick={handleSaveToggle}
          style={styles.actionBtn}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark reel'}
        >
          <div style={{ ...styles.iconCircle, color: saved ? '#fbbf24' : '#fff' }}>
            {saved ? (
              <FaBookmark size={22} style={{ filter: 'drop-shadow(0 2px 8px rgba(251,191,36,0.5))' }} />
            ) : (
              <FaRegBookmark size={22} />
            )}
          </div>
          <span style={styles.actionLabel}>{saved ? 'Saved' : 'Save'}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={styles.actionBtn}
          aria-label="Share reel"
        >
          <div style={styles.iconCircle}>
            <FaShare size={20} />
          </div>
          <span style={styles.actionLabel}>Share</span>
        </button>

        {/* Mute / Unmute Button */}
        <button
          onClick={toggleMute}
          style={styles.actionBtn}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          <div style={{ ...styles.iconCircle, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            {isMuted ? (
              <FaVolumeMute size={18} color="#fff" />
            ) : (
              <FaVolumeUp size={18} color="#ec4899" />
            )}
          </div>
          <span style={styles.actionLabel}>{isMuted ? 'Muted' : 'Sound'}</span>
        </button>
      </div>

      {/* 9. Sleek Bottom Comments Drawer */}
      {showCommentsModal && (
        <div
          style={styles.commentsDrawer}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Comments sheet"
        >
          <div style={styles.commentsHeader}>
            <div style={styles.commentsHeaderLeft}>
              <FaComment size={15} color="#ec4899" />
              <span style={styles.commentsTitle}>Comments ({commentsList.length})</span>
            </div>
            <button
              onClick={() => setShowCommentsModal(false)}
              style={styles.closeCommentsBtn}
              aria-label="Close comments"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div style={styles.commentsList}>
            {commentsList.map((c, i) => (
              <div key={i} style={styles.commentItem}>
                <div style={styles.commentAvatar}>
                  {c.user.charAt(0).toUpperCase()}
                </div>
                <div style={styles.commentContent}>
                  <span style={styles.commentUser}>@{c.user}</span>
                  <p style={styles.commentText}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} style={styles.commentForm}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={styles.commentInput}
            />
            <button
              type="submit"
              style={styles.sendCommentBtn}
              aria-label="Post comment"
              disabled={!newComment.trim()}
            >
              <FaPaperPlane size={13} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#09090b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  backdropLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  backdropVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(30px) brightness(0.35)',
    transform: 'scale(1.25)',
  },
  backdropBlurOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  videoWrapper: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foregroundVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '110px',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 65%, transparent 100%)',
    zIndex: 10,
    pointerEvents: 'none',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '240px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 80%, transparent 100%)',
    zIndex: 10,
    pointerEvents: 'none',
  },
  pulseWrapper: {
    position: 'absolute',
    inset: 0,
    zIndex: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  pulseCircle: {
    width: '76px',
    height: '76px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    border: '1.5px solid rgba(255, 255, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
  },
  pausedOverlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    pointerEvents: 'none',
  },
  pausedCircle: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    border: '2px solid rgba(255, 255, 255, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
  },
  toastContainer: {
    position: 'absolute',
    top: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 40,
    backgroundColor: 'rgba(24, 24, 27, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
    padding: '7px 16px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
    animation: 'fadeIn 0.2s ease-out',
  },
  toastText: {
    color: '#fff',
    fontSize: '12.5px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  bottomContent: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    maxWidth: 'calc(100% - 76px)',
    zIndex: 20,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    textShadow: '0 2px 6px rgba(0,0,0,0.9)',
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  username: {
    fontSize: '13.5px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '-0.2px',
  },
  dotSeparator: {
    color: '#a1a1aa',
    fontSize: '11px',
  },
  dateBadge: {
    fontSize: '11px',
    color: '#d4d4d8',
  },
  reelTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
    lineHeight: '1.3',
  },
  reelCaption: {
    fontSize: '12.5px',
    lineHeight: '1.45',
    color: '#f4f4f5',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  hashtags: {
    fontSize: '11.5px',
    color: '#f472b6',
    fontWeight: '500',
    margin: 0,
  },
  viewProjectBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    alignSelf: 'flex-start',
    marginTop: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#fff',
    padding: '5px 12px',
    borderRadius: '9999px',
    fontSize: '11.5px',
    fontWeight: '600',
    textDecoration: 'none',
    backdropFilter: 'blur(8px)',
    transition: 'background-color 0.15s, transform 0.15s',
  },
  rightActionsColumn: {
    position: 'absolute',
    bottom: '16px',
    right: '12px',
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '14px',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    padding: '2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#fff',
    transition: 'transform 0.15s',
  },
  iconCircle: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
    transition: 'transform 0.15s, background-color 0.15s',
  },
  actionLabel: {
    fontSize: '11px',
    fontWeight: '600',
    marginTop: '3px',
    color: '#fff',
    textShadow: '0 1px 4px rgba(0,0,0,0.9)',
  },
  commentsDrawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '65%',
    backgroundColor: '#18181b',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: '18px',
    borderTopRightRadius: '18px',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 -10px 30px rgba(0,0,0,0.8)',
    animation: 'slideUp 0.25s ease-out',
  },
  commentsHeader: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #27272a',
  },
  commentsHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  commentsTitle: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: '700',
  },
  closeCommentsBtn: {
    background: '#27272a',
    border: 'none',
    color: '#a1a1aa',
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  commentsList: {
    padding: '12px 16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '220px',
  },
  commentItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  commentAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#ec4899',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    flexShrink: 0,
  },
  commentContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentUser: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#a1a1aa',
  },
  commentText: {
    fontSize: '12.5px',
    color: '#f4f4f5',
    margin: '1px 0 0',
  },
  commentForm: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderTop: '1px solid #27272a',
    backgroundColor: '#18181b',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '9999px',
    color: '#fff',
    padding: '7px 14px',
    fontSize: '12.5px',
    outline: 'none',
  },
  sendCommentBtn: {
    backgroundColor: '#ec4899',
    border: 'none',
    color: '#fff',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
};

export default ReelItem;
