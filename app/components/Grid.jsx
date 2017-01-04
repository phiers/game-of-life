import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions'; // eslint-disable-line
import Cell from 'Cell'; // eslint-disable-line
import { generateNextArr } from 'run'; // eslint-disable-line

class Grid extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { speed } = this.props.grid;
    const interval = window.setInterval(() => dispatch(actions.runGrid(generateNextArr())), speed);
    dispatch(actions.setIntervalName(interval));
  }
  componentWillUnmount() {
    const { interval } = this.props.grid;
    window.clearInterval(interval);
  }

  render() {
    const { cells, width, running } = this.props.grid;
    const renderCells = () => {
      if (!cells) {
        return <p>Loading...</p>;
      }
      return cells.map(cell =>
        <Cell key={cell.id} running={running} {...cell} />,
      );
    };
    return (
      <div className="grid" style={{ width }}>
        {renderCells()}
      </div>
    );
  }
}


export default connect(state => state)(Grid);

Grid.propTypes = {
  dispatch: PropTypes.func,
  grid: PropTypes.shape({
    cells: PropTypes.array.isRequired,
    interval: PropTypes.number,
    running: PropTypes.bool.isRequired,
    speed: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
  }),
};
