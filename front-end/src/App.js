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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateGroup from "./createGroup.js";
import PrimaryNav from "./primaryNav.js";
import CreateAccount from "./createAccount.js";
import SetCookie from "./setCookie"
import GetCookie from "./getCookie"
import SetLocalStorage from "./setLocalStorage"
import GetLocalStorage from "./getLocalStorage"

const App = (props) => {
  require("dotenv").config();
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <Router>
        <PrimaryNav user={user} setuser={setUser} />
        <Routes>
          <Route path="/set-cookie" element={<SetCookie />} />
          <Route path="/get-cookie" element={<GetCookie />} />
          <Route path="/set-local-storage" element={<SetLocalStorage />} />
          <Route path="/get-local-storage" element={<GetLocalStorage />} />
          <Route path="/Home" element={<Home/>}/>
          <Route path="/CreateGroup" element={<CreateGroup/>}/>
          <Route path="/Friends" element={<Friends />}/>
          <Route path="/CurrentGroupMembers" element={<CurrentGroupMembers/>}/>
          <Route path="/Account" element={<Account/>}/>
          <Route path="/AllGroups" element={<AllGroups/>}/>
          <Route path="/MoreInfo" element={<MoreInfo/>}/>
          <Route path="/createAccount" element={<CreateAccount/>}/>
          <Route path="/" element={<Login user = {user} setuser={setUser}/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
