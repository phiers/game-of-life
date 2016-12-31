import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Cell from 'Cell'; // eslint-disable-line

class Grid extends Component {

  render() {
    const { status, width } = this.props.grid;
    const renderCells = () => {
      if (!status) {
        return <p>Loading...</p>;
      }
      return status.map((item, index) =>
        <Cell key={index} pos={index} status={item} />,
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
    status: PropTypes.array.isRequired,
    width: PropTypes.string.isRequired,
  }),
};
