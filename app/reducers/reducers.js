/* eslint-disable no-plusplus */
const cells = [];
for (let i = 0; i < 3500; i++) {
  cells.push({ id: i, alive: 0 });
}

const initialGridState = {
  interval: null,
  running: false,
  width: '52.5em',
  speed: 500,
  generation: 1,
  cells,
};

const gridReducer = (state = initialGridState, action) => {
  switch (action.type) {
    case 'CHANGE_SPEED':
      return {
        ...state,
        speed: action.speed,
      };
    case 'CLEAR_GRID': {
      const cellArray = [];
      for (let i = 0; i < state.cells.length; i++) {
        cellArray.push({ id: i, alive: 0 });
      }
      return {
        ...state,
        interval: null,
        generation: 0,
        running: false,
        cells: cellArray,
      };
    }
    case 'LOAD_RANDOM_GRID':
      return {
        ...state,
        cells: action.array,
      };
    case 'PAUSE_GRID':
      return {
        ...state,
        running: false,
      };
    case 'RUN_GRID': {
      const newGen = state.generation + 1;
      return {
        ...state,
        running: true,
        generation: newGen,
        cells: action.array,
      };
    }
    case 'SET_GRID_SIZE': {
      const area = action.width * action.height;
      const cellArray = [];
      for (let i = 0; i < area; i++) {
        cellArray.push({ id: i, alive: 0 });
      }
      return {
        ...state,
        running: false,
        width: `${action.width * 0.75}em`,
        generation: 0,
        cells: cellArray,
      };
    }
    case 'SET_INTERVAL_NAME':
      return {
        ...state,
        interval: action.interval,
      };
    case 'TOGGLE_CELL': {
      const newArray = state.cells.map((cell) => {
        if (cell.id === action.id) {
          const newStatus = cell.alive === 0 ? 1 : 0;
          return {
            ...cell,
            alive: newStatus,
          };
        }
        return cell;
      });
      return {
        ...state,
        cells: newArray,
      };
    }
    default:
      return state;
  }
};

export default gridReducer;
