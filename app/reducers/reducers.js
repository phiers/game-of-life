const initialState = {
  running: true,
  width: '52.5em',
  cells: 3500,
  speed: 'normal',
  generations: 1,
  status: new Array(3500).fill('off'),
};


const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GRID_SIZE': {
      const area = action.width * action.height;
      return {
        ...state,
        width: `${action.width * 0.75}em`,
        cells: area,
        status: new Array(area).fill('off'),
      };
    }
    default:
      return state;
  }
};

export default gridReducer;
