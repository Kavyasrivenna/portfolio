// src/components/ReelItem.jsx
import React, { useRef, useEffect, useState } from 'react';
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
} from 'react-icons/fa';

const ReelItem = ({
  reel,
  isActive,
  isMuted,
  toggleMute,
  isPlaying,
  onPlayPauseToggle,
}) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes || 0);

  useEffect(() => {
    let timer;
    if (isActive) {
      setProgress(0);
      timer = setTimeout(() => setProgress(100), 100);
    } else {
      setProgress(0);
    }
    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isActive && isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isMuted, isPlaying]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      {reel.type === 'video' ? (
        <video
          ref={videoRef}
          src={reel.src}
          className="w-full h-full object-cover"
          loop
        />
      ) : (
        <img src={reel.src} className="w-full h-full object-cover" alt="" />
      )}

      {/* Gradient Overlays */}
      <div className="absolute top-0 w-full h-28 bg-gradient-to-b from-black/70 to-transparent z-10" />
      <div className="absolute bottom-0 w-full h-36 bg-gradient-to-t from-black/70 to-transparent z-10" />

      {/* Centered Play Button */}
      {isActive && !isPlaying && (
        <button
          onClick={onPlayPauseToggle}
          className="absolute inset-0 z-30 flex items-center justify-center"
        >
          <div className="bg-black/50 rounded-full p-4">
            <FaPlay className="text-white text-3xl" />
          </div>
        </button>
      )}

      {/* Top Progress Bar */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-20">
          <div
            className="h-full bg-white transition-all duration-[5000ms] ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Bottom Text */}
      <div className="absolute bottom-24 left-4 z-20 text-white max-w-[70%]">
        <p className="text-sm font-semibold">@{reel.username}</p>
        <p className="text-base leading-tight">{reel.caption}</p>
        <p className="text-xs text-gray-400">{reel.hashtags}</p>
      </div>

      {/* Right Controls */}
      <div className="absolute bottom-24 right-4 z-20 flex flex-col items-center gap-4 text-white">
        <button onClick={handleLike} className={liked ? 'animate-ping-once' : ''}>
          {liked ? (
            <FaHeart className="text-red-500 text-3xl" />
          ) : (
            <FaRegHeart className="text-3xl" />
          )}
        </button>
        <span className="text-xs">{likes}</span>

        <FaComment className="text-3xl" />
        <span className="text-xs">{reel.comments || 0}</span>

        <button onClick={toggleMute}>
          {isMuted ? (
            <FaVolumeMute className="text-2xl" />
          ) : (
            <FaVolumeUp className="text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ReelItem;
