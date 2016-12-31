import React from 'react';

const Cell = (props) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    const pos = props.pos;
    props.updateStatus(pos);
  };
  return (
    <div className="grid-cell" id={props.status} onClick={handleClick} /> // eslint-disable-line
  );
};

export default Cell;

Cell.propTypes = {
  status: React.PropTypes.string.isRequired,
};
