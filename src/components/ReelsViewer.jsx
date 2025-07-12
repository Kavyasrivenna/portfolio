import React, { useState, useRef, useEffect } from 'react';
import ReelItem from './ReelItem';
import { reelsData } from '../data/reelsData';

const ReelsViewer = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);
  const progressRef = useRef(null);

  const nextReel = () => {
    if (index < reelsData.length - 1) setIndex(index + 1);
  };

  const prevReel = () => {
    if (index > 0) setIndex(index - 1);
  };

  // Wheel support (desktop)
  const handleScroll = (e) => {
    if (e.deltaY > 0) nextReel();
    else prevReel();
  };

  // Touch support (mobile)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const distance = touchStartY.current - touchEndY.current;
    if (distance > 50) nextReel();     // swipe up
    if (distance < -50) prevReel();    // swipe down
  };

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = '0%';
      progressRef.current.offsetHeight; // force reflow
      progressRef.current.style.transition = 'width 4s linear';
      progressRef.current.style.width = '100%';

      const timer = setTimeout(() => {
        nextReel();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div
      ref={containerRef}
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="h-screen w-full overflow-hidden relative"
    >
      {/* Reels Container */}
      <div
        className="transition-transform duration-500"
        style={{ transform: `translateY(-${index * 100}vh)` }}
      >
        {reelsData.map((item, i) => (
          <ReelItem key={i} item={item} />
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {reelsData.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-gray-500'} transition-all`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black z-10">
        <div ref={progressRef} className="h-full bg-white transition-all" />
      </div>
    </div>
  );
};

export default ReelsViewer;
