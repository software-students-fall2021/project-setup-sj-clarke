import React from 'react'
import './createAccount.css'

function createAccount(){


    
    return(
        <div className="CreateAccount">

            <h1>Sign Up</h1>

            <form>
                <label>First Name</label>
                <input type="text" name="fName" placeholder="Enter First Name"></input>
                <label>Last Name</label>
                <input type="text" name="lName" placeholder="Enter Last Name"></input>
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter Username"></input>
                <label>Password</label>
                <input type="password" name="password" placeholder="Enter Password"></input>
                <input type="submit" value="Sign Up"></input>
            </form>

        </div>

    )

}


export default createAccount;