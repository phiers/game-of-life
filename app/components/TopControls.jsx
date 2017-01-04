import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from 'actions'; // eslint-disable-line
import { generateNextArr } from 'run'; // eslint-disable-line
/* eslint-disable max-len */

class TopControls extends Component {
  constructor() {
    super();
    this.handleRun = this.handleRun.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleRun() {
    const { dispatch } = this.props;
    const { speed, running } = this.props.grid;
    const run = () => dispatch(actions.runGrid(generateNextArr()));
    if (!running) {
      const interval = window.setInterval(run, speed);
      dispatch(actions.setIntervalName(interval));
    }
  }
  handlePause() {
    const { dispatch } = this.props;
    const { interval, running } = this.props.grid;
    if (running) {
      dispatch(actions.pauseGrid());
      window.clearInterval(interval);
    }
  }
  handleClear() {
    const { dispatch } = this.props;
    const { interval } = this.props.grid;
    dispatch(actions.clearGrid());
    if (interval) {
      window.clearInterval(interval);
    }
  }
  render() {
    const { generation } = this.props.grid;
    return (
      <div className="controls top-controls">
        <div className="flex-items">
          <div className="secondary button-group">
            <button className="button" onClick={this.handleRun}>Run</button>
            <button className="button" onClick={this.handlePause}>Pause</button>
            <button className="button" onClick={this.handleClear}>Clear</button>
          </div>
          <p>Generations: <span>{generation}</span></p>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(TopControls);

TopControls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  grid: PropTypes.shape({
    generation: PropTypes.number.isRequired,
    interval: PropTypes.number,
    running: PropTypes.bool.isRequired,
    speed: PropTypes.number.isRequired,
  }),
};
