import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
/* eslint-disable */
import Main from 'Main';
import store from 'configureStore';
import actions from 'actions';
import { generateArr } from 'run';

// Load foundation
$(document).foundation();
// App css
require('style!css!sass!applicationStyles');
/* eslint-enable */

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});
// TODO: add dispatch to activate grid
store.dispatch(actions.loadRandomGrid(generateArr()));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Main />
    </div>
  </Provider>,
    document.getElementById('app')); //eslint-disable-line
