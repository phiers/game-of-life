import store from 'configureStore'; // eslint-disable-line
/* eslint-disable no-use-before-define */
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
  const corners = [0, 69, 3430, 3499];
  // TODO: temp holder for corners
  for (let c = 0; c < corners.length; c += 1) {
    const index = corners[c];
    nextArr[index] = { id: index, alive: 1 };
  }

  // iterate thru top row of grid, TODO: exclude first and last cell
  for (let t = 1; t < width - 1; t += 1) {
    // nextArr[a] = { id: a, alive: 0 };
    const topSum = sumNeighbors(t, width, currentArr, 'top');
    buildNewArr(t, topSum, currentArr, nextArr);
  }
  // iterate thru last row excluding first and last cell (corners)
  for (let b = lastRowStart + 1; b < len - 1; b += 1) {
    // nextArr[b] = { id: b, alive: 0 };
    const bottomSum = sumNeighbors(b, width, currentArr, 'bottom');
    buildNewArr(b, bottomSum, currentArr, nextArr);
  }
  // iterate thru left column excluding first and last cells (corners)
  // iterate array excluding first and last row of grid
  // TODO: if I want to exclude the first and last column, this gets complicated
  // would it work if I just took them last, and overwrite these results?
  for (let i = width; i < len - width; i += 1) {
    // cases for first and last column - skip without doing anything
    if (i % width === 0) {
      // first column
      console.log(i);
      const leftSum = sumNeighbors(i, width, currentArr, 'left');
      buildNewArr(i, leftSum, currentArr, nextArr);
    } else if ((i + 1) % width === 0) {
      // last column
      const rightSum = sumNeighbors(i, width, currentArr, 'right');
      buildNewArr(i, rightSum, currentArr, nextArr);
    } else { // case for all other cells
      // sum neighbors to determine actions
      const neighborSum = sumNeighbors(i, width, currentArr);
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
