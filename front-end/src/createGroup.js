import React from "react";
import "./createGroup.css";
import { Form, Button, NavLink } from "react-bootstrap";
//import Title from './header.js'
function CreateGroup() {
  return (
    <div className="CreateGroup">
      <header>TripSplit</header>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Group Name:</Form.Label>
          <Form.Control type="username" placeholder="Enter Group Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Add Friend:</Form.Label>
          <Form.Control type="text" placeholder="Add Friend To Group" />
        </Form.Group>
      </Form>
      <Button>Save</Button>
    </div>
  );
}
export default CreateGroup;
