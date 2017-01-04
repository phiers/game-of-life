import store from 'configureStore'; // eslint-disable-line
/* eslint-disable no-use-before-define */
export const generateArr = () => {
  const len = store.getState().grid.cells.length;
  const randomArr = [];
  const max = 7;
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
  let neighborSum = 0;
  // set const for starting position of last row
  const lastRowStart = (len - width);
  // iterate thru top row of grid, allowing for first and last cell (corners)
  for (let t = 0; t < width; t += 1) {
    if (t === 0) {
      // top left corner of grid
      neighborSum = sumNeighbors(t, width, currentArr, 'topLeft');
      buildNewArr(t, neighborSum, currentArr, nextArr);
    } else if (t === width - 1) {
      // top right corner of grid
      neighborSum = sumNeighbors(t, width, currentArr, 'topRight');
      buildNewArr(t, neighborSum, currentArr, nextArr);
    } else {
      neighborSum = sumNeighbors(t, width, currentArr, 'top');
      buildNewArr(t, neighborSum, currentArr, nextArr);
    }
  }
  // iterate thru last row, allowing for first and last cell (corners)
  for (let b = lastRowStart; b < len; b += 1) {
    if (b === lastRowStart) {
      // bottom left corner of grid
      neighborSum = sumNeighbors(b, width, currentArr, 'bottomLeft');
      buildNewArr(b, neighborSum, currentArr, nextArr);
    } else if (b === len - 1) {
      neighborSum = sumNeighbors(b, width, currentArr, 'bottomRight');
      buildNewArr(b, neighborSum, currentArr, nextArr);
    } else {
      neighborSum = sumNeighbors(b, width, currentArr, 'bottom');
      buildNewArr(b, neighborSum, currentArr, nextArr);
    }
  }
  // iterate array excluding first and last row of grid
  for (let i = width; i < len - width; i += 1) {
    // cases for first and last column
    if (i % width === 0) {
      // first column
      neighborSum = sumNeighbors(i, width, currentArr, 'left');
      buildNewArr(i, neighborSum, currentArr, nextArr);
    } else if ((i + 1) % width === 0) {
      // last column
      neighborSum = sumNeighbors(i, width, currentArr, 'right');
      buildNewArr(i, neighborSum, currentArr, nextArr);
    } else { // case for all other cells
      // sum neighbors to determine actions
      neighborSum = sumNeighbors(i, width, currentArr);
      // Populate nextArr with new values
      buildNewArr(i, neighborSum, currentArr, nextArr);
    }
  }
  return nextArr;
};
/* eslint-disable no-param-reassign */
// function to build array based on neighbor rules
function buildNewArr(ind, sum, oldArr, updateArr) {
  if (oldArr[ind].alive === 0) {
    if (sum === 3) {
      updateArr[ind] = { id: ind, alive: 1 };
    } else {
      updateArr[ind] = oldArr[ind];
    }
  } else if (oldArr[ind].alive === 1) {
    if (sum < 2 || sum > 3) {
      updateArr[ind] = { id: ind, alive: 0 };
    } else {
      updateArr[ind] = oldArr[ind];
    }
  }
}
// function to sum neighbor values for use in buildNewArr
function sumNeighbors(ind, width, arr, gridPosition) {
  let indexes = [];
  const len = arr.length;
  switch (gridPosition) {
    // assume a 70 x 50 grid -- tested results in JSBin
    case 'top':
      // index 1 => 0, 2, 3431, 3432, 3430, 71, 70, 72
      indexes = [
        ind + 1, ind - 1,
        ind + (len - width), (ind + 1) + (len - width), (ind - 1) + (len - width),
        ind + width, (ind - 1) + width, (ind + 1) + width,
      ];
      break;
    case 'bottom':
      // index 3431 => 3430, 3432, 3360, 3361, 3362, 1, 0, 2
      indexes = [
        ind + 1, ind - 1,
        ind - width, (ind - 1) - width, (ind + 1) - width,
        ind - (len - width), (ind - 1) - (len - width), (ind + 1) - (len - width),
      ];
      break;
    case 'right':
      // index 139 => 70, 138, 69, 68, 0, 209, 208, 140
      indexes = [
        (ind + 1) - width, ind - 1,
        ind - width, (ind - 1) - width, (ind + 1) - (width * 2),
        ind + width, (ind - 1) + width, ind + 1,
      ];
      break;
    case 'left':
      // index 70 => 71, 139, 0, 69, 1, 140, 209, 141
      indexes = [
        ind + 1, (ind - 1) + width,
        ind - width, ind - 1, (ind + 1) - width,
        ind + width, (ind - 1) + (width * 2), (ind + 1) + width,
      ];
      break;
    case 'topLeft':
      // index 0
      indexes = [
        (ind - 1) + len, ind + (len - width), (ind + 1) + (len - width),
        (ind - 1) + width, ind + 1,
        (ind - 1) + (width * 2), ind + width, (ind + 1) + width,
      ];
      break;
    case 'topRight':
      // index = width - 1
      indexes = [
        (ind - 1) + (len - width), ind + (len - width), (ind + 1) + (len - (2 * width)),
        ind - 1, (ind + 1) - width,
        (ind - 1) + width, ind + width, ind + 1,
      ];
      break;
    case 'bottomLeft':
      // index = len - width
      indexes = [
        ind - 1, ind - width, (ind + 1) - width,
        (ind - 1) + width, ind + 1,
        (ind - 1) - (len - (2 * width)), ind - (len - width), (ind + 1) - (len - width),
      ];
      break;
    case 'bottomRight':
      // index = len - 1
      indexes = [
        (ind - 1) - width, ind - width, (ind + 1) - (2 * width),
        ind - 1, (ind + 1) - width,
        (ind - 1) - (len - width), ind - (len - width), (ind + 1) - (len),
      ];
      break;
    default:
      indexes = [
        ind + 1, ind - 1,
        ind - width, (ind - 1) - width, (ind + 1) - width,
        ind + width, (ind - 1) + width, (ind + 1) + width,
      ];
  }
  const newArr = [];
  for (let j = 0; j < 8; j += 1) {
    newArr.push(arr[indexes[j]].alive);
  }
  return newArr.reduce((a, b) => a + b);
}
