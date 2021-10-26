
import React from 'react';
import './App.css';
import './homeScreen.js'
import './createGroup.js'
import './friends.js';
import Friends from './friends.js'
import Home from './homeScreen.js'
import Title from './header'
import AllGroups from './allGroups.js'
import CurrentGroupMembers from './currentGroupMembers';
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
          <Route path="/Friends" component={Friends}>
            <Friends/>
          </Route>
          <Route path="/AllGroups" component={AllGroups}>
            <AllGroups/>
          </Route>
        </Switch>
    </Router>
>>>>>>> 7cb21a1d370e2625466706c3c2d34b6e0d80f13c
    </div>
   
  );
}

export default App;
