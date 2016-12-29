import React from 'react';
/* eslint-disable */
import TitleBar from 'TitleBar';
import Grid from 'Grid';
import TopControls from 'TopControls';
import BottomControls from 'BottomControls';
/* eslint-enable */
const Main = () =>
   (
     <div>
       <TitleBar />
       <div className="container">
         <div className="app">
           <TopControls />
           <Grid />
           <BottomControls />
         </div>
       </div>

     </div>
  );

module.exports = Main;
