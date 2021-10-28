import React from "react";
import "./App.css";
import "./homeScreen.js";
import "./createGroup.js";
import "./friends.js";
import CreateGroup from "./createGroup.js";
import Friends from "./friends.js";
import Home from "./homeScreen.js";
import Title from "./header";
import AllGroups from "./allGroups.js";
import CurrentGroupMembers from "./currentGroupMembers";
import MoreInfo from "./moreInfo";
import Account from "./accountInfo.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Switch>
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route path="/CurrentGroupMembers" component={CurrentGroupMembers}>
            <CurrentGroupMembers tripName={"Mexico 2021"} />
          </Route>
          <Route path="/MoreInfo" component={MoreInfo}>
            <MoreInfo />
          </Route>
          <Route path="/Friends" component={Friends}>
            <Friends />
          </Route>
          <Route path="/AllGroups" component={AllGroups}>
            <AllGroups />
          </Route>
          <Route path="/Account" component={Account}>
            <Account />
          </Route>

          <Route path="/CreateGroup" component={CreateGroup}>
            <CreateGroup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
