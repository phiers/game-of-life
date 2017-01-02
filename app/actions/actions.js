const actions = {
  setGridSize(width, height) {
    return {
      type: 'SET_GRID_SIZE',
      width,
      height,
    };
  },
  toggleCell(id) {
    return {
      type: 'TOGGLE_CELL',
      id,
    };
  },
};

export default actions;
