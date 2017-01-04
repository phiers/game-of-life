import React from 'react';

const TitleBar = () => (
  <div className="top-bar">
    <div className="top-bar-left">
      <p className="menu-text">Conway's Game of Life</p>
    </div>
    <div className="top-bar-right">
      <ul className="dropdown menu" data-dropdown-menu>
        <li>
          <a href="#menu" className="menu-header">Click Below to Learn More</a>
          <ul className="menu">
            <li><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" rel="noopener noreferrer" target="_blank">Wikipedia</a></li>
            <li><a href="https://www.youtube.com/watch?v=E8kUJL04ELA" rel="noopener noreferrer" target="_blank">YouTube</a></li>
            <li><a href="https://github.com/phiers/game-of-life" rel="noopener noreferrer" target="_blank">GitHub</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);

export default TitleBar;
