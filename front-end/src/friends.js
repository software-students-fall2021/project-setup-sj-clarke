import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Modal from "react-modal";
import "./friends.css";
import axios from "axios";
Modal.setAppElement("#root");

function Friends() {
  const [friends, setFriends] = useState([]);
  // will hold the current user from login page (for now just user in database we have)
  const [currentUser, setCurrentUser] = useState(); 

  useEffect(() => {
    // a nested function that fetches the data

    async function fetchData() {
      // fetch object for current user. 
      const response = await axios("/Friends/sjclarke");
      // extract the friends list from the server respons
      const data_friends = (response.data[0].friends)

      // set friends 
      setFriends(data_friends);
      
    }
    // fetch the data
    fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);

  // modal use states
  const [addGroupmodalIsOpen, setaddGroupModal] = useState(false);
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [user, setUser] = useState(" ");
  const index = 0; 

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
              setUser(friend);
            }}
          >
            Add to Group
          </button>
        </td>
      </tr>
    );
  };

  // hook JSON to hold the data of a new group addition
  const [newGroupAdditionValues, setNewGroupAdditionValues] = useState({
    friend: "",
    groupName: "",
  });

  // Handling changes to adding friend to group form
  const handleAddToGroupChange = (event) => {
    const newdata = { ...newGroupAdditionValues };
    newdata[event.target.id] = event.target.value;
    setNewGroupAdditionValues(newdata);
  };

  // Handling submission of adding friend to a group
  // Calls a post request to the back end sending back the JSON of the group addition. 
  const handleGroupSubmit = (event) => {
    event.preventDefault();
    setaddGroupModal(false);
    // newGroupAdditionalValues is the added group we will send to back end to post.
    axios.post("AddToGroup/sjclarke", newGroupAdditionValues)
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
    axios.post("Friends/sjclarke", newFriendValues)
    // clear the input line
    setNewFriendValues({friendAdded: "" });
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
