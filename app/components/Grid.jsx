import React from 'react';

import Cell from 'Cell'; // eslint-disable-line

const gridStyle = {
  width: '60em',
};

export default class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      running: true,
      width: '60em',
      cells: 2400,
      speed: 'normal',
      generations: 1,
      status: [],
    };
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(pos) {
    console.log(pos); // pos will be index in state.status array
  }
  renderCells() {
    const arr = [];
    for (let i = 0; i < 2400; i += 1) {
      const status = i % 60 === 0 ? 'on' : 'off';
      arr.push(status);
    }
    return arr.map((item, index) => { // needs to be rendered from state
      return <Cell key={index} pos={index} status={item} updateStatus={this.handleCellClick} />;
    });
  }
  render() {
    return (
      <div className="grid" style={gridStyle}>
        {this.renderCells()}
      </div>
    );
  }
}
