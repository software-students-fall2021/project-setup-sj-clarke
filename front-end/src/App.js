
import React from 'react';
import './App.css';
import './homeScreen.js'
import './friends.js';
import Friends from './friends.js'
import Home from './homeScreen.js'
import Title from './header'
import CurrentGroupMembers from './currentGroupMembers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
<<<<<<< HEAD


=======
>>>>>>> 79472807a2ea6ee6306c536e658f86b2346579e9
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
<<<<<<< HEAD
          <Route  path="/Friends" component={Friends}>
            <Friends/>
          </Route>
=======
>>>>>>> 79472807a2ea6ee6306c536e658f86b2346579e9
        </Switch>
    </Router>
    </div>
   
  );
}

export default App;