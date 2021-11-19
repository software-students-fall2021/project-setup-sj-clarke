import React, { Redirect, useState } from "react";
import "./primaryNav.css";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import ExpenseAction from "./addExpenseModal";
import SettleUp from "./settleUpModal";

const PrimaryNav = (props) => {
  const [showAddExpense, setAddExpense] = useState(false);
  const [showSettleUp, setSettleUp] = useState(false);
  // we assume a function named setuser is passed as a prop to this component

  // show a login link if the user is not yet logged in
  let logInOutComponent = <Link to="/">Login</Link>;
  // show a logout link if the user is already logged in
  if (props.user.success)
    logInOutComponent = (
      <>
        <Link to="/">Logout {props.user.username} </Link>
      </>
    );

  return (
    <div className="Header">
      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="lg"
        bg="medium"
        variant="light"
        href="/#home"
      >
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="me-auto">
            <ReactBootStrap.Nav.Link href="/CreateGroup">
              Create A Group
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="/AllGroups">
              All Groups
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="/Friends">
              Friends
            </ReactBootStrap.Nav.Link>
            <ReactBootStrap.NavDropdown
              title="Current Group"
              id="collasible-nav-dropdown"
            >
              <ReactBootStrap.NavDropdown.Item
                href="#action/AddExpense"
                onClick={() => setAddExpense(true)}
              >
                Add Expense
              </ReactBootStrap.NavDropdown.Item>
              {/* <ReactBootStrap.NavDropdown.Item
                href="#action/SettleUp"
                onClick={() => setSettleUp(true)}
              >
                {" "}
                Settle up
              </ReactBootStrap.NavDropdown.Item> */}
              <ReactBootStrap.NavDropdown.Item href="/CurrentGroupMembers">
                Group members
              </ReactBootStrap.NavDropdown.Item>
            </ReactBootStrap.NavDropdown>
            <ReactBootStrap.Nav.Link href="/Account" onClick={props.authorized}>
              Account
            </ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
        <ReactBootStrap.Navbar.Brand href="/Home">
          TripSplit{" "}
        </ReactBootStrap.Navbar.Brand>
      </ReactBootStrap.Navbar>
      <ExpenseAction show={showAddExpense} setModal={setAddExpense} />
      {/* <SettleUp show={showSettleUp} setModal={setSettleUp} /> */}
    </div>
  );
};

export default PrimaryNav;
