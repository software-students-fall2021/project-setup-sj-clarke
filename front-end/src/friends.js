import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Modal from "react-modal";
import "./friends.css";
import axios from "axios";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
Modal.setAppElement("#root");

function Friends() {
  const [friends, setFriends] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  useEffect(() => {
    // a nested function that fetches the data

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      // mockaroo api call for list of friends in json file format
      const response = await axios("/Friends");
      // extract the data from the server response
      setFriends(response.data);
    }
    // fetch the data
    fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);

  // modal use states
  const [expmodalIsOpen, setexpModalisOpen] = useState(false);
  const [addGroupmodalIsOpen, setaddGroupModal] = useState(false);
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [user, setUser] = useState(" ");

  // creating a row for each instance within JSON file holding all of the friends
  const renderRow = (friend, index) => {
    // 1 row instance within a table
    return (
      <tr key={friend.id}>
        <td>{friend.friendAdded}</td>
        <td>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setaddGroupModal(true);
              setUser(friend.friendAdded);
            }}
          >
            Add to Group
          </button>
        </td>
      </tr>
    );
  };

  const [newGroupAdditionValues, setNewGroupAdditionValues] = useState({
    friend: "",
    groupName: "",
  });

  const handleAddToGroupChange = (event) => {
    const newdata = { ...newGroupAdditionValues };
    newdata[event.target.id] = event.target.value;
    setNewGroupAdditionValues(newdata);
    console.log(newdata);
  };

  const handleGroupSubmit = (event) => {
    event.preventDefault();
    setaddGroupModal(false);
    // newGroupAdditionalValues is the added group we will send to back end to post.
    console.log(newGroupAdditionValues);
    // post request to backend here

    // clear the input line
    setNewGroupAdditionValues({ friend: "", groupName: "" });
  };

  const [newFriendValues, setNewFriendValues] = useState({ friendAdded: "" });

  const handleAddFriendChange = (event) => {
    const newdata = { ...newFriendValues };
    newdata[event.target.id] = event.target.value;
    setNewFriendValues(newdata);
    console.log(newdata);
  };

  const handleFriendSubmit = (event) => {
    event.preventDefault();
    setModalisOpen(false);
    console.log(newFriendValues.friendAdded);
    // post request to backend here

    // clear the input line
    setNewFriendValues({ friendAdded: "" });
  };

  return (
    <div className="Friends">
      <title className="CurrentTripTitle">
        Friends
        <button
          onClick={() => setModalisOpen(true)}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          Add Friend
        </button>
        <Modal isOpen={modalIsOpen} dialogClassName="modal-design">
          <h1 className="modal-title">Add friend</h1>
          <form onSubmit={(e) => handleFriendSubmit(e)} className="addFriend">
            <label>
              Add Friend:
              <input
                id="friendAdded"
                type="text"
                placeholder="Enter username"
                name="friendAdded"
                value={newFriendValues.friendAdded}
                onChange={(e) => handleAddFriendChange(e)}
              />
              <input type="submit" />
              <button
                onClick={() => setModalisOpen(false)}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
            </label>
          </form>
        </Modal>
      </title>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{friends.map(renderRow)}</tbody>
      </ReactBootStrap.Table>
      <Modal isOpen={addGroupmodalIsOpen}>
        <h1 className="Modal-title">Add to Group</h1>
        <p>Friend name: {user}</p>
        <form onSubmit={(e) => handleGroupSubmit(e)} className="addGroupMember">
          <div>
            <label>Friend name: </label>
            <input
              id="friend"
              type="text"
              name="friend"
              placeholder="Friend name"
              value={newGroupAdditionValues.friend}
              onChange={(e) => handleAddToGroupChange(e)}
            />
            <label>Group name: </label>
            <input
              id="groupName"
              type="text"
              placeholder="Enter group name"
              name="groupName"
              value={newGroupAdditionValues.group}
              onChange={(e) => handleAddToGroupChange(e)}
            />
          </div>
          <input type="submit" />
          <button
            onClick={() => setaddGroupModal(false)}
            type="button"
            className="btn btn-secondary btn-sm"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Friends;
