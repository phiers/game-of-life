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
