
import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Modal from "react-modal";
import "./createGroup.css";
import axios from "axios";
import { render } from "@testing-library/react";
import { useForm } from "react-hook-form";
import {Button} from "react-bootstrap";
Modal.setAppElement("#root");

function CreateGroup() {
  const [group, setGroup] = useState([])
  const [friend, setFriend] = useState([])
  const {register, handleSubmit, errors} = useForm()
  useEffect(() => {
    // a nested function that fetches the data
  
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      // mockaroo api call for list of friends in json file format 
    //const group_response = await axios(
        //`http://localhost:5000/CreateGroup?groupName=${newGroupAdditionValues.group}&friendAdded=${newGroupAdditionValues.friend}`
       // "https://my.api.mockaroo.com/test.json?key=34e7d950"
      //).then((data)=>{
        // extract the data from the server response

        const response = await axios("http://localhost:5000/CreateGroup/groupname");

       // console.log(data.data[0]);
       // let nameR =data.data[0].groupName;
        //let friendR = data.data[0].friendAdded;
        //let newdata = {
           // "group":nameR,
           // "friend":friendR}
        setNewGroupAdditionValues(response.data)
        
       // console.log(newdata)
     /* }).catch((error)=>{
          console.log(error);
        let newdata = {
            "group":"Hawaii",
            "friend":"Emily"}
        setNewGroupAdditionValues(newdata)
        console.log(newdata)*/
      
      
      
      }

     
    
    // fetch the data
    fetchData();
    
    // the blank array below causes this callback to be executed only once on component load
  }, []);
  

const currentUser = "sjclarke"; 
const [newGroupAdditionValues, setNewGroupAdditionValues] = useState(
    {
      group: "",
      friend: ""
      
    }
  )
  const handleAddToGroupChange = (event) => {
    const newdata = {...newGroupAdditionValues}
    newdata[event.target.id] = event.target.value
    setNewGroupAdditionValues(newdata)
    console.log(newdata)
  }

  const handleGroupSubmit = (event) => {
    event.preventDefault(); 
   
    // newGroupAdditionalValues is the added group we will send to back end to post. 
    console.log(newGroupAdditionValues)
    //console.log(newGroupAdditionValues.group)
    // post request to backend here 
    const group_response =  axios.post(
        `http://localhost:5000/CreateGroup?userInput=${currentUser}&groupName=${newGroupAdditionValues.group}&friendAdded=${newGroupAdditionValues.friend}`
      )
      .then(()=>{
        setNewGroupAdditionValues(
          {group: "", 
          friend: ""})
      })

    // clear the input line 
    
  }
  

  return (
    <div className="CreateGroup">
      <header>Create a New Group</header>
     
     
      <form onSubmit = {(e) => handleGroupSubmit(e)}className = "addGroupMember">
      <div>
        <label>Group Name: </label>
          <input 
            id = "group"
            type="text" 
            name="group"
            placeholder="Enter Group Name" 
            value = {newGroupAdditionValues.group}
            onChange = {(e) => handleAddToGroupChange(e)}
          />
          
        
        <label>
          Friend Name: </label>
          <input 
            id = "friend"
            type="text" 
            name="friend"
            placeholder="Add Friend To Group" 
            value = {newGroupAdditionValues.friend}
            onChange = {(e) => handleAddToGroupChange(e)}
           />
        
        </div>
      {/*//<Button onClick ={() =>{ setNewGroupAdditionValues({group: "", friend: ""}) }} type="button">Save</Button>*/}

      <Button onClick ={(event) =>{ handleGroupSubmit(event) }} type="button">Save</Button>
          
        </form>
     
    </div>
  );
}
export default CreateGroup;
