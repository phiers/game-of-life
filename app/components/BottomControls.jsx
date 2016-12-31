import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions'; // eslint-disable-line

class BottomControls extends Component {
  constructor() {
    super();
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }
  handleSizeChange(evt) {
    evt.preventDefault();
    const { dispatch } = this.props;
    const size = evt.target.textContent;
    const height = parseInt(size.substr(5, 7), 10);
    const width = parseInt(size.substr(0, 2), 10);
    dispatch(actions.setGridSize(width, height));
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
            <button className="button">Slow</button>
            <button className="button">Medium</button>
            <button className="button">Fast</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(BottomControls);

BottomControls.propTypes = {
  dispatch: PropTypes.func,
};
