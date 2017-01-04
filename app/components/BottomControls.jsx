import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions'; // eslint-disable-line
import { generateArr, generateNextArr }  from 'run'; // eslint-disable-line

class BottomControls extends Component {
  constructor() {
    super();
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
  }
  handleSizeChange(evt) {
    evt.preventDefault();
    const { dispatch } = this.props;
    const size = evt.target.textContent;
    const height = parseInt(size.substr(5, 7), 10);
    const width = parseInt(size.substr(0, 2), 10);
    dispatch(actions.setGridSize(width, height));
    dispatch(actions.loadRandomGrid(generateArr()));
  }
  handleSpeedChange(evt) {
    evt.preventDefault();
    const { dispatch } = this.props;
    const { interval, running } = this.props.grid;
    const speedText = evt.target.textContent;
    let speed;
    if (speedText === 'Slow') {
      speed = 1000;
    } else if (speedText === 'Fast') {
      speed = 250;
    } else {
      speed = 500;
    }
    if (running) {
      // interval has current speed, so it has to be cleared and restarted
      window.clearInterval(interval);
      dispatch(actions.changeSpeed(speed));
      const run = () => dispatch(actions.runGrid(generateNextArr()));
      const intervalID = window.setInterval(run, speed);
      dispatch(actions.setIntervalName(intervalID));
    }
    dispatch(actions.changeSpeed(speed));
  }
  render() {
    return (
      <div className="controls bottom-controls">
        <div className="flex-items">
          <p>Grid Size: </p>
          <div className="secondary button-group">
            <button className="button" onClick={this.handleSizeChange}>60 x 40</button>
            <button className="button" onClick={this.handleSizeChange}>70 x 50</button>
            <button className="button" onClick={this.handleSizeChange}>80 x 60</button>
          </div>
          <p>Sim Speed: </p>
          <div className="secondary button-group">
            <button className="button" onClick={this.handleSpeedChange}>Slow</button>
            <button className="button" onClick={this.handleSpeedChange}>Normal</button>
            <button className="button" onClick={this.handleSpeedChange}>Fast</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(BottomControls);

BottomControls.propTypes = {
  dispatch: PropTypes.func,
  grid: PropTypes.shape({
    interval: PropTypes.number,
    running: PropTypes.bool,
  }),
};
