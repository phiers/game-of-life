import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, Router, IndexRoute, hashHistory } from 'react-router';
/* eslint-disable */
import Main from 'Main';

// Load foundation

$(document).foundation();
// App css
require('style!css!sass!applicationStyles');
/* eslint-enable */

ReactDOM.render(
  <div>
    <Main />
  </div>,
    document.getElementById('app')); //eslint-disable-line
