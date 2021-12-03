 import React, { useEffect, useState } from 'react'
import './createAccount.css'
import axios from "axios";
import { Button } from 'react-bootstrap'

function CreateAccount(){
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    const [fName, setFName] = useState([])
    const [lName, setLName] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios("http://localhost:5000/signup/user");
            console.log(response)
            setNewUserValues(response.data)
        }

        fetchData();
    }, []);

    const [newUserValues, setNewUserValues] = useState(
        {
            
            username: "",
            password: "",
            fName: "",
            lName: ""
        }
    )

    const handleAddUserChange = (event) => {
        const newdata = {...newUserValues}
        newdata[event.target.id] = event.target.value
        setNewUserValues(newdata)
        console.log(newdata)
    }

    const handleUserSubmit = (event) => {
        event.preventDefault();

        console.log(newUserValues)

        const group_response = axios.post(
            `${process.env.REACT_APP_BACK_END_DOMAIN}/signup?fName=${newUserValues.fName}&lName=${newUserValues.lName}&username=${newUserValues.username}&password=${newUserValues.password}`
        )

        .then(() => {
            setNewUserValues(
                {
                    
                    username: "",
                    password: "",
                    fName: "",
                    lName: ""

                }
            )
        })


    }
    


    
    return(
        <div className="CreateAccount">

            <h1>Sign Up</h1>

            <form onSubmit = {(e) => handleUserSubmit(e)} className="register">
                <label>First Name</label>
                <input 
                id="fName" 
                type="text" 
                name="fName" 
                placeholder="Enter First Name" 
                value = {newUserValues.fName} 
                onChange = {(e) => handleAddUserChange(e)}></input>
                <label>Last Name</label>
                <input id="lName" type="text" name="lName" placeholder="Enter Last Name" value = {newUserValues.lName} onChange = {(e) => handleAddUserChange(e)}></input>
                <label>Username</label>
                <input id="username" type="text" name="username" placeholder="Enter Username" value = {newUserValues.username} onChange = {(e) => handleAddUserChange(e)}></input>
                <label>Password</label>
                <input id="password" type="password" name="password" placeholder="Enter Password" value = {newUserValues.password} onChange = {(e) => handleAddUserChange(e)}></input>
                <Button onClick = {(event) => { handleUserSubmit(event) }} type="button">Sign Up</Button>
            </form>

        </div>

    )

}


export default CreateAccount;