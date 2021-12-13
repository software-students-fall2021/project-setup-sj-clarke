import React from 'react'
import './accountInfo.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./mockUsers.json"
import { Link, Redirect } from 'react-router-dom'
import { set } from 'js-cookie'



function Account(props){
    const jwtToken = localStorage.getItem("token")
    console.log(`JWT token: ${jwtToken}`)
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true)
    const [currentUser, setCurrentUser] = useState();
    const username = localStorage.getItem("loggedInUser");
    console.log(username)
    const [accountInfo, setAccountInfo] = useState([]);
    const [fName, setFName] = useState()
    const [lName, setLName] = useState()
    const [uName, setUName] = useState(localStorage.getItem("loggedInUser"));
   

    useEffect(() => {
        async function fetchData (){
           
            const response = await axios(`/accountinfo/${uName}`, { headers: { Authorization: `JWT ${jwtToken}` } });
            console.log(response)

            setFName(response.data.fName)
            setLName(response.data.lName)
            setUName(response.data.username);
        
        }
        fetchData();
    }, []);


 
    

    console.log(fName)
    console.log(lName)
    console.log(uName)
    
    return(
       
        <>
        {isLoggedIn ? (
        <div className="Account">
            <header>Account Information</header>
            <p>View your account information</p>
            <form>
                <label>First Name<input
                id="fName"
                type="text" 
                name="fName" 
                value={fName}
                disabled="disabled"
                ></input></label>
                <label>Last Name<input type="text" name="lName" value={lName} disabled="disabled"></input></label>
                <label>Username<input type="text" name="username" value={uName} disabled="disabled" ></input></label>

            </form>


        </div>
        ): (
            <div className="NotLoggedIn">
                <p>Please login to view this information.</p>

            <Link to="/">Login</Link>
            </div>
        )}
        </>
    )

    
}

export default Account;