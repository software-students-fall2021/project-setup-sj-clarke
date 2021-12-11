import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Modal from "react-modal";
import "./friends.css";
import axios from "axios";
// Modal.setAppElement("#root");

function Friends() {
  // holds all friends for a user
  const [friends, setFriends] = useState([]);
  // holds the username of the current user from login page 
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("loggedInUser"));

  
  useEffect(() => {  
    // a nested function that fetches the data
    
    async function fetchData() {
      // extract the friends list from the server response
      const response = await axios(`/Friends/${currentUser}`);
      // set friends
      setFriends(response.data);
    }
    // fetch the data
    fetchData();
    // the blank array below causes this callback to be executed only once on component load
  }, []);

  // modal use states
  const [addGroupmodalIsOpen, setaddGroupModal] = useState(false);
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(" ");
  const index = 0;
  const [removeFriendModal, setRemoveFriendModal] = useState(false);
  const [addedFriend, setAddedFriend] = useState();
  // creating a row for each instance within JSON file holding all of the friends
  const renderRow = (friend, index) => {
    // 1 row instance within a table
    return (
      <tr key={index}>
        <td>{friend}</td>
        <td>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setaddGroupModal(true);
              setSelectedFriend(friend);
            }}
          >
            Add to Group
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setRemoveFriendModal(true);
              setSelectedFriend(friend);
            }}
          >
            Remove Friend
          </button>
        </td>
      </tr>
    );
  };

  // handles when we want to remove a friend by calling delete request
  const handleRemoveFriend = (friendName) => {
    const username = process.env.REACT_APP_USERNAME;
    axios.delete(`Friends/${currentUser}/${friendName}`);
  };

  // hook JSON to hold the data of a new group addition
  const [newGroupAdditionValues, setNewGroupAdditionValues] = useState({
    friend: selectedFriend,
    groupName: "",
  });

  // Handling changes to adding friend to group form
  const handleAddToGroupChange = (event) => {
    const newdata = { ...newGroupAdditionValues };
    newdata[event.target.id] = event.target.value;
    newdata.friend = selectedFriend;
    setNewGroupAdditionValues(newdata);
    console.log(newdata);
  };

  // Handling submission of adding friend to a group
  // Calls a post request to the back end sending back the JSON of the group addition.
  const handleGroupSubmit = (event) => {
    event.preventDefault();
    setaddGroupModal(false);
    // newGroupAdditionalValues is the added group we will send to back end to post.
    axios.post(`AddToGroup/${currentUser}`, newGroupAdditionValues);
    // clear the input line
    setNewGroupAdditionValues({ friend: "", groupName: "" });

  };

  // hook JSON to hold the data of a new friend addition
  const [newFriendValues, setNewFriendValues] = useState({ friendAdded: "" });

  // handles changes to the add friend form within "add friend" modal
  const handleAddFriendChange = (event) => {
    const newdata = { ...newFriendValues };
    newdata[event.target.id] = event.target.value;
    setNewFriendValues(newdata);
    console.log(newdata);
  };

  // Handling submission of adding a new friend
  // Calls a post request to the back end sending back the JSON of the friend addition.
  const handleFriendSubmit = (event) => {
    event.preventDefault();
    setModalisOpen(false);
    // post request to backend with new data
    const username = process.env.REACT_APP_USERNAME;
    axios.post(`Friends/${currentUser}`, newFriendValues);
    // clear the input line
    setNewFriendValues({ friendAdded: "" });
  };

  // General friends page layout
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
        <tbody>{friends.map(renderRow, index)}</tbody>
      </ReactBootStrap.Table>
      <Modal isOpen={addGroupmodalIsOpen}>
        <h1 className="Modal-title">Add to Group</h1>
        <form onSubmit={(e) => handleGroupSubmit(e)} className="addGroupMember">
          <div>
            <label className="input-label">Friend name: </label>
            <input
              id="friend"
              type="text"
              defaultValue={selectedFriend}
              // value={newGroupAdditionValues.friend}
              onChange={(e) => handleAddToGroupChange(e)}
            />
            <label className="input-label">Group name: </label>
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
      <Modal isOpen={removeFriendModal} dialogClassName="modal-design">
        <h1 className="modal-title">
          Are you sure you want to remove {selectedFriend} as a friend?
        </h1>
        <button
          onClick={() => {
            setRemoveFriendModal(false);
            handleRemoveFriend(selectedFriend);
          }}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          yes
        </button>
        <button
          onClick={() => setRemoveFriendModal(false)}
          type="button"
          className="btn btn-secondary btn-sm"
        >
          no
        </button>
      </Modal>
    </div>
  );
}

export default Friends;
