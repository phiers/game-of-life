import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions'; // eslint-disable-line


class Cell extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt) {
    const { dispatch, id, running } = this.props;
    evt.preventDefault();
    if (running) { // TODO: need to change this to !running
      dispatch(actions.toggleCell(id));
    }
  }
  render() {
    const { alive } = this.props;
    const cellClass = alive ? 'grid-cell on' : 'grid-cell';

    return (
      <div className={cellClass} onClick={this.handleClick} /> // eslint-disable-line
    );
  }
}

export default connect()(Cell);

Cell.propTypes = {
  alive: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired,
};
