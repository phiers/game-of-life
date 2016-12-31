import React from 'react';

const TitleBar = () => (
  <div className="top-bar">
    <div className="top-bar-left">
      <p className="menu-text">Game of Life Viewer</p>
    </div>
    <div className="top-bar-right">
      <p className="menu-text">View source code on
        <a href="https://github.com/phiers/game-of-life" rel="noopener noreferrer" target="_blank"> GitHub</a>
      </p>
    </div>
  </div>
);

export default TitleBar;
