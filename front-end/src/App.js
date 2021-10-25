
import React from 'react';
import './App.css';
import './homeScreen.js'
import './friends.js'
import Friends from './friends.js'
import { BrowserRouter, Router, Switch, Link } from "react-browser-dom"


import Home from './homeScreen.js'
function App() {
  return (
    <div className="App">
      <Router>
        <Title />
        <Switch>
          <Route exact path = "/" component = {Home}>
          <Home/>
          </Route>
            <Route path = "/Friends" component = {Friends}>
              <Friends/>
            </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;