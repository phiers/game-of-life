/* eslint-disable no-plusplus */
const cells = [];
for (let i = 0; i < 3500; i++) {
  cells.push({ id: i, alive: false });
}

const initialGridState = {
  running: true,
  width: '52.5em',
  noOfCells: 3500,
  speed: 'normal',
  generations: 1,
  cells,
};

const gridReducer = (state = initialGridState, action) => {
  switch (action.type) {
    case 'SET_GRID_SIZE': {
      const area = action.width * action.height;
      const cellArray = [];
      for (let i = 0; i < area; i++) {
        cellArray.push({ id: i, status: 'off' });
      }
      return {
        ...state,
        width: `${action.width * 0.75}em`,
        noOfCells: area,
        cells: cellArray,
      };
    }
    case 'TOGGLE_CELL': {
      const newArray = state.cells.map((cell) => {
        if (cell.id === action.id) {
          const newStatus = !cell.alive;
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
