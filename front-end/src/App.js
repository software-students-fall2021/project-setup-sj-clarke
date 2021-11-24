import React, { useState } from "react";
import "./App.css";
import "./homeScreen.js";
import "./createGroup.js";
import "./friends.js";
import Friends from "./friends.js";
import Home from "./homeScreen.js";
import Title from "./header";
import AllGroups from "./allGroups.js";
import CurrentGroupMembers from "./currentGroupMembers";
import MoreInfo from "./moreInfo";
import Account from "./accountInfo.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateGroup from "./createGroup.js";
import PrimaryNav from "./primaryNav.js";
import CreateAccount from "./createAccount.js";

const App = (props) => {
  require("dotenv").config();
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Router>
        <PrimaryNav user={user} setuser={setUser} />
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/CreateGroup">
            <CreateGroup />
          </Route>
          <Route path="/Friends">
            <Friends />
          </Route>
          <Route path="/CurrentGroupMembers">
            <CurrentGroupMembers />
          </Route>
          <Route path="/Account">
            <Account />
          </Route>
          <Route path="/AllGroups">
            <AllGroups />
          </Route>
          <Route path="/MoreInfo">
            <MoreInfo />
          </Route>
          <Route path="/createAccount">
            <CreateAccount />
          </Route>
          <Route path="/">
            <Login user={user} setuser={setUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
