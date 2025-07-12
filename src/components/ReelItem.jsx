import React from 'react';

const ReelItem = ({ item }) => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center bg-black text-white">
      {item.type === 'video' ? (
        <video
          src={item.src}
          controls
          autoPlay
          loop
          muted
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={item.src}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute bottom-10 left-5 text-lg font-bold bg-black/50 px-3 py-1 rounded">
        {item.title}
      </div>
    </div>
  );
};

export default ReelItem;
