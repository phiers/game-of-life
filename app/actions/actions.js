const actions = {
  setGridSize(width, height) {
    return {
      type: 'SET_GRID_SIZE',
      width,
      height,
    };
  },
};

export default actions;
