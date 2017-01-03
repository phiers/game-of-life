import store from 'configureStore'; // eslint-disable-line

export const generateArr = () => {
  const len = store.getState().grid.cells.length;
  const randomArr = [];
  const max = 11;
  for (let i = 0; i < len; i += 1) {
    // generate a random alive value, skewing toward 0
    const randomInt = Math.floor(Math.random() * (max - 0)) + 0;
    const alive = randomInt === 1 ? 1 : 0;
    randomArr.push({
      id: i,
      alive,
    });
  }
  return randomArr;
};

export const generateNextArr = () => {
  const len = store.getState().grid.cells.length;
  const currentArr = store.getState().grid.cells;
  const nextArr = [];
  const widthString = store.getState().grid.width;
  const width = parseFloat(widthString) / 0.75;
  // set const for starting position of last row, excl first cell
  const lastRowStart = (len - width);
  // iterate thru first row of grid, excluding first and last cell
  for (let a = 0; a < width; a += 1) {
    nextArr[a] = { id: a, alive: 0 };
  }
  // iterate thru last row
  for (let b = lastRowStart; b < len; b += 1) {
    nextArr[b] = { id: b, alive: 0 };
  }
  // iterate array excluding first and last row of grid
  for (let i = width; i < len - width; i += 1) {
    // case for first column
    if (i % width === 0) {
      nextArr[i] = { id: i, alive: 1 };
    // case for last column
    } else if ((i + 1) % width === 0) {
      nextArr[i] = { id: i, alive: 1 };
    // case for all other cells
    } else {
      // sum neighbors to determine actions
      const neighborSum = sumNeighbors(i, width, currentArr); // eslint-disable-line
      if (currentArr[i].alive === 0) {
        if (neighborSum === 3) {
          nextArr[i] = { id: i, alive: 1 };
        } else {
          nextArr[i] = currentArr[i];
        }
      } else if (currentArr[i].alive === 1) {
        if (neighborSum < 2 || neighborSum > 3) {
          nextArr[i] = { id: i, alive: 0 };
        } else {
          nextArr[i] = currentArr[i];
        }
      }
    }
  }
  return nextArr;
};

function sumNeighbors(ind, width, arr, gridPosition) {
  let indexes = [];
  switch (gridPosition) {
    case 'top':
      indexes = [
        ind + 1, ind - 1,
        ind - width, ind - (width - 1), ind - (width + 1),
        ind + width, ind + (width - 1), ind + (width + 1),
      ];
      break;
    case 'bottom':
      indexes = [
        ind + 1, ind - 1,
        ind - width, ind - (width - 1), ind - (width + 1),
        ind + width, ind + (width - 1), ind + (width + 1),
      ];
      break;
    case 'right':
      indexes = [
        ind + 1, ind - 1,
        ind - width, ind - (width - 1), ind - (width + 1),
        ind + width, ind + (width - 1), ind + (width + 1),
      ];
      break;
    case 'left':
      indexes = [
        ind + 1, ind - 1,
        ind - width, ind - (width - 1), ind - (width + 1),
        ind + width, ind + (width - 1), ind + (width + 1),
      ];
      break;
    default:
      indexes = [
        ind + 1, ind - 1,
        ind - width, ind - (width - 1), ind - (width + 1),
        ind + width, ind + (width - 1), ind + (width + 1),
      ];
  }
  const newArr = [];
  for (let j = 0; j < 8; j += 1) {
    newArr.push(arr[indexes[j]].alive);
  }
  return newArr.reduce((a, b) => a + b);
}
