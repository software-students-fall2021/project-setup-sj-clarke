
import React, {useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap"; 
import Modal from 'react-modal'
import "./friends.css"
import axios from 'axios';


function Friends() {
const [friends, setFriends] = useState([])
const [transactions, setTransactions] = useState([]);  
    useEffect(() => {
      // a nested function that fetches the data
    
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        // mockaroo api call for list of friends in json file format 
        const response = await axios(
          "https://my.api.mockaroo.com/friends.json?key=bd7c3ef0"
        ); 
        // extract the data from the server response
        setFriends(response.data); 
        }
      // fetch the data
      fetchData();
      
      // the blank array below causes this callback to be executed only once on component load
    }, []);

// modal use states
const [expmodalIsOpen, setexpModalisOpen] = useState(false)
const [addGroupmodalIsOpen, setaddGroupModal] = useState(false)
const [modalIsOpen, setModalisOpen] = useState(false)
const [user, setUser] = useState(" ")


// creating a row for each instance within JSON file holding all of the friends
const renderRow = (friend, index) => {
    // 1 row instance within a table 
    return (
    <tr key = {friend.id}>
      <td>{friend.friendAdded}</td>
      <td>
        <button type="button" className="btn btn-secondary btn-sm" 
            onClick ={() => {setexpModalisOpen(true); setUser(friend.friendAdded)}}>
            Charge</button>
        <button  type="button" className="btn btn-secondary btn-sm"
            onClick ={() => {setaddGroupModal(true); setUser(friend.friendAdded)}}
            >Add to Group</button>
      </td>
    </tr>
    )
    }
    return(
        <div className= "Friends">
          <title className ="CurrentTripTitle">Friends
          <button onClick ={() => setModalisOpen(true)} type="button" className="btn btn-secondary btn-sm">Add Friend</button>
        <Modal isOpen = {modalIsOpen} dialogClassName = "modal-design">
        <h className = "modal-title">Add friend</h>
        <form>
          <label>Add Friend: 
           <input type="text" placeholder = "Enter username" />
           <button onClick ={() => setModalisOpen(false)} type="button" className="btn btn-secondary btn-sm">Save</button>
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
            <tbody>
              {friends.map(renderRow)}
            </tbody>
          </ReactBootStrap.Table>
          <Modal isOpen = {expmodalIsOpen}>
              <h className = "modal-title">Charge Friend</h>
              <p>Username: {user}</p>
              <form>
              <label>Charge: 
              <input type="text" placeholder = "Enter expense amount" />
              </label>
              </form>
              <button onClick ={() => setexpModalisOpen(false)} type="button" className="btn btn-secondary btn-sm">Save</button>
          </Modal>
          <Modal isOpen = {addGroupmodalIsOpen}>
              <h className = "modal-title">Add to Group</h>
              <p>Username: {user}</p>
              <form>
                <label>Add to Group: 
                <input type="text" placeholder = "Enter group name" />
                </label>
                </form>
              <button onClick ={() => setaddGroupModal(false)} type="button" className="btn btn-secondary btn-sm">Save</button>
          </Modal>
        </div>
    )
}


export default Friends;