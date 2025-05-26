import React from 'react';

const IntroVideo = ({ onEnd }) => {
  return (
    <div className="memory-narcos intro-video-container">
      <h1>Plata o Plomo</h1>
      <video
        className="intro-video"
        src="/public/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onEnd}
      />
      <button className="narcos-button" onClick={onEnd}>
        Commencer
      </button>
    </div>
  );
};

export default IntroVideo;