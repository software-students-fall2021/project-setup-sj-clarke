import React from 'react'
import './accountInfo.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import "./mockUsers.json"



function Account(props){


    

    

  

    
    return(
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
    )

    
}

export default Account;