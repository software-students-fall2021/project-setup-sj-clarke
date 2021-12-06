import React from 'react'
import './accountInfo.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./mockUsers.json"
import {Link} from 'react-router-dom'
import { set } from 'js-cookie'



function Account(props){
    const jwtToken = localStorage.getItem("token")
    console.log(`JWT token: ${jwtToken}`)
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true)
    const [currentUser, setCurrentUser] = useState();
    const username = process.env.REACT_APP_USERNAME;
    const [accountInfo, setAccountInfo] = useState([]);
    const [fName, setFName] = useState()
    const [lName, setLName] = useState()
    const [uName, setUName] = useState()
   

    useEffect(() => {
        async function fetchData (){
            const response = await axios(`/accountinfo/${username}`, { headers: { Authorization: `JWT ${jwtToken}` } });

            setFName(response.data.fName)
            setLName(response.data.lName)
            setUName(response.data.username);
        
        }
        fetchData();
    }, []);


 
    


    
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
            <Link to="/login?error=home"/>
        )}
        </>
    )

    
}

export default Account;