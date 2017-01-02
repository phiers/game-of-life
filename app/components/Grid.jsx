import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions'; // eslint-disable-line
import Cell from 'Cell'; // eslint-disable-line

class Grid extends Component {

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
  grid: PropTypes.shape({
    cells: PropTypes.array.isRequired,
    running: PropTypes.bool.isRequired,
    width: PropTypes.string.isRequired,
  }),
};
