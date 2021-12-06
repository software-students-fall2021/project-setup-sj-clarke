import React from 'react'
import './accountInfo.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./mockUsers.json"
import {Link} from 'react-router-dom'



function Account(props){
    const jwtToken = localStorage.getItem("token")
    console.log(`JWT token: ${jwtToken}`)
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true)


    

    

  

    
    return(
        <>
        {isLoggedIn ? (
        <div className="Account">
            <header>Account Information</header>
            <p>Change your account information</p>
            <form>
                <label>First Name<input type="text" name="fName"></input></label>
                <label>Last Name<input type="text" name="lName" ></input></label>
                <label>Username<input type="text" name="username" ></input></label>
                <label>Password<input type="password" name="password"></input></label>
                <input type="submit" value="Change Information" />

            </form>


        </div>
        ): (
            <Link to="/login?error=home"/>
        )}
        </>
    )

    
}

export default Account;