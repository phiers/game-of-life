import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from 'actions'; // eslint-disable-line
/* eslint-disable max-len */
class TopControls extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="controls top-controls">
        <div className="flex-items">
          <div className="secondary button-group">
            <button className="button" onClick={() => { dispatch(actions.runGrid()); }}>Run</button>
            <button className="button" onClick={() => { dispatch(actions.pauseGrid()); }}>Pause</button>
            <button className="button" onClick={() => { dispatch(actions.clearGrid()); }}>Clear</button>
          </div>
          <p>Generations: <span>{this.props.grid.generation}</span></p>
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
  }),
};
