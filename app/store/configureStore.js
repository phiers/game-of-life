import { createStore, combineReducers } from 'redux';
import gridReducer from 'reducers'; // eslint-disable-line

const reducer = combineReducers({
  grid: gridReducer,
});

const store = createStore(reducer);

export default store;
