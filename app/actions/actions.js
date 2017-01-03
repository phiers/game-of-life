const actions = {
  clearGrid() {
    return {
      type: 'CLEAR_GRID',
    };
  },
  loadRandomGrid(array) {
    return {
      type: 'LOAD_RANDOM_GRID',
      array,
    };
  },
  pauseGrid() {
    return {
      type: 'PAUSE_GRID',
    };
  },
  runGrid(generation, array) {
    return {
      type: 'RUN_GRID',
      generation,
      array,
    };
  },
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
