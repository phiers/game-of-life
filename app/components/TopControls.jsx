import React from 'react';

export default class TopControls extends React.Component {
  render() {
    return (
      <div className="controls top-controls">
        <div className="flex-items">
          <div className="secondary button-group">
            <button className="button">Run</button>
            <button className="button">Pause</button>
            <button className="button">Clear</button>
          </div>
          <p>Generations: <span>0</span></p>
        </div>
      </div>
    );
  }
}
