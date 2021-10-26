
import React from 'react';
import './App.css';
import './homeScreen.js'

import Home from './homeScreen.js'
import Title from './header'
import CurrentGroupMembers from './currentGroupMembers';
import MoreInfo from './moreInfo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Router>
        <Title />
        <Switch>
        <Route exact path="/" component={Home}>
            <Home/>
          </Route >
          <Route  path="/CurrentGroupMembers" component={CurrentGroupMembers}>
            <CurrentGroupMembers tripName={"Mexico 2021"}/>
          </Route>
          <Route  path="/MoreInfo" component={MoreInfo}>
            <MoreInfo/>
          </Route>
        </Switch>
    </Router>
    </div>
   
  );
}

export default App;