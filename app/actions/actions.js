const actions = {
  changeSpeed(speed) {
    return {
      type: 'CHANGE_SPEED',
      speed,
    };
  },
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
  runGrid(array) {
    return {
      type: 'RUN_GRID',
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
  setIntervalName(interval) {
    return {
      type: 'SET_INTERVAL_NAME',
      interval,
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
