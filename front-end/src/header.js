


import './header.css';

import React from 'react'
import {useState} from 'react'
import * as ReactBootStrap from "react-bootstrap"; 
import  ExpenseAction from './addExpenseModal';
import SettleUp from './settleUpModal';

function Title() {
  const [showAddExpense, setAddExpense] = useState(false);
  const [showSettleUp, setSettleUp] = useState(false);
  return (
      <div className="Title">
      <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="medium" variant="light">
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="me-auto">
      <ReactBootStrap.Nav.Link href="#CreateAGroup">Create A Group</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link href="#AllGroups">All Groups</ReactBootStrap.Nav.Link>
      <ReactBootStrap.NavDropdown title="Current Group" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item href="#action/AddExpense" onClick={() => setAddExpense(true)}>Add Expense</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/SettleUp" onClick={() => setSettleUp(true)}>  Settle up</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="/CurrentGroupMembers">Group members</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
    <ReactBootStrap.Nav.Link href="#AllGroups">Account</ReactBootStrap.Nav.Link>
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
  <ReactBootStrap.Navbar.Brand href="#home">TripSplit</ReactBootStrap.Navbar.Brand>
</ReactBootStrap.Navbar>
<ExpenseAction show={showAddExpense} setModal={setAddExpense}/>
<SettleUp show={showSettleUp} setModal={setSettleUp}/>





    </div>
  )
}

export default Title