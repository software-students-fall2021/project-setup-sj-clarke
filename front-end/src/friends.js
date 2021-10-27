
import React, { useEffect, useState } from "react";
import Title from './header.js'
import * as ReactBootStrap from "react-bootstrap"; 
import Modal from 'react-modal'
import "./friends.css"


function Friends() {
// dummy data for list of friends
// later we will be getting data from an API call in Json format 
const friend =  [
    {username: "sjclarke10"},
    {username: "jDoe1"}
    ]

const inputAddFriend = [
  "Username "
]

const inputChargeFriend = [
  "Expense Amount "
]

const inputAddGroup = [
  "Group name "
]

const [expmodalIsOpen, setexpModalisOpen] = useState(false)
const [addGroupmodalIsOpen, setaddGroupModal] = useState(false)
const [modalIsOpen, setModalisOpen] = useState(false)





const [user, setUser] = useState(" ")


// creating a row for each instance within JSON file holding all of the transactions
const renderRow = (friend, index) => {
// 1 row instance within a table 
// need to add the buttons to row 
// add modals for each button 
return (
<tr key = {index}>
  <td>{friend.username}</td>
  <td>
    <button type="button" className="btn btn-secondary btn-sm" 
        onClick ={() => {setexpModalisOpen(true); setUser(friend.username)}}>
        Charge</button>
    <button  type="button" className="btn btn-secondary btn-sm"
        onClick ={() => {setaddGroupModal(true); setUser(friend.username)}}
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
              {friend.map(renderRow)}
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