
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
import MoreInfo from './moreInfo'
<<<<<<< HEAD
import CreateGroup from './createGroup.js'
import './createGroup.js'
=======
import Account from './accountInfo.js';
>>>>>>> 64c58c4e06c56a5d8c1274d8ea4c8e638967c331
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
          <Route path="/Friends" component={Friends}>
            <Friends/>
          </Route>
          <Route path="/allGroups" component={AllGroups}>
            <AllGroups/>
          </Route>
<<<<<<< HEAD
          <Route path="/createGroup" component={CreateGroup}>
            <CreateGroup/>
=======
          <Route path="/Account" component={Account}>
            <Account/>
>>>>>>> 64c58c4e06c56a5d8c1274d8ea4c8e638967c331
          </Route>
        </Switch>
    </Router>
    </div>
   
  );
}

export default App;
