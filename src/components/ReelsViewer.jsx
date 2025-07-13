// src/components/ReelsViewer.jsx
import React, { useEffect, useRef, useState } from 'react';
import reelsData from './ReelsData';
import ReelItem from './ReelItem';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const ReelsViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showArrows, setShowArrows] = useState(true);

  const containerRef = useRef(null);
  const arrowTimeoutRef = useRef(null);

  const toggleMute = () => setIsMuted((prev) => !prev);
  const togglePlayPause = () => setIsPlaying((prev) => !prev);

  const resetArrowTimer = () => {
    setShowArrows(true);
    clearTimeout(arrowTimeoutRef.current);
    arrowTimeoutRef.current = setTimeout(() => setShowArrows(false), 3000);
  };

  const scrollToIndex = (index) => {
    if (containerRef.current && containerRef.current.children[index]) {
      containerRef.current.children[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  const nextReel = () => {
    if (currentIndex < reelsData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      scrollToIndex(currentIndex + 1);
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const scrollTop = containerRef.current.scrollTop;
      const childHeight = window.innerHeight;
      const index = Math.round(scrollTop / childHeight);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    resetArrowTimer();
    const handleUserInteraction = () => resetArrowTimer();

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      clearTimeout(arrowTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black relative"
    >
      {reelsData.map((reel, index) => (
        <div
          key={index}
          className="snap-start flex justify-center items-center h-screen w-full"
        >
          <div className="w-full max-w-[420px] h-full flex items-center justify-center">
            <ReelItem
              reel={reel}
              isActive={index === currentIndex}
              isMuted={isMuted}
              isPlaying={isPlaying}
              toggleMute={toggleMute}
              onPlayPauseToggle={togglePlayPause}
            />
          </div>
        </div>
      ))}

      {/* Arrow Buttons */}
      {showArrows && (
        <div className="absolute z-30 right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 transition-opacity duration-500">
          <button
            onClick={prevReel}
            className="bg-white text-black p-3 rounded-full shadow hover:bg-gray-200"
          >
            <FaArrowUp className="text-xl" />
          </button>
          <button
            onClick={nextReel}
            className="bg-white text-black p-3 rounded-full shadow hover:bg-gray-200"
          >
            <FaArrowDown className="text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReelsViewer;
