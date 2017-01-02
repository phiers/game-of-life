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
    if (!running) {
      dispatch(actions.toggleCell(id));
    }
  }
  render() {
    const { alive } = this.props;
    const cellClass = alive === 1 ? 'grid-cell on' : 'grid-cell';

    return (
      <div className={cellClass} onClick={this.handleClick} /> // eslint-disable-line
    );
  }
}

export default connect()(Cell);

Cell.propTypes = {
  alive: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired,
};
