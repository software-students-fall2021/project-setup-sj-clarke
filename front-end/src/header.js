
import './header.css';
import Friends from './friends.js'
import './friends.js'
import React from 'react'
import * as ReactBootStrap from "react-bootstrap"; 

function Title() {
  return (
      <div className="Title">
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="medium" variant="light">
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="me-auto">
            <ReactBootStrap.Nav.Link href="CreateAGroup">Create A Group</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="AllGroups">All Groups</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href= './friends'>Friends</ReactBootStrap.Nav.Link>
            <ReactBootStrap.NavDropdown title="Current Group" id="collasible-nav-dropdown">
              <ReactBootStrap.NavDropdown.Item href="#action/3.1">Add Expense</ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item href="#action/3.2">Settle up</ReactBootStrap.NavDropdown.Item>
              <ReactBootStrap.NavDropdown.Item href="#action/3.3">Group members</ReactBootStrap.NavDropdown.Item>
            </ReactBootStrap.NavDropdown>
          <ReactBootStrap.Nav.Link href="#AllGroups">Account</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
          <ReactBootStrap.Nav>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
        <ReactBootStrap.Navbar.Brand href="#home">TripSplit</ReactBootStrap.Navbar.Brand>
      </ReactBootStrap.Navbar>
    </div>
  )
}

export default Title