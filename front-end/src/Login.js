import React, {useState, useEffect} from 'react';
import {Redirect, Link, Navigate, useSearchParams} from 'react-router-dom'
import './Login.css';
import axios from 'axios';
import createAccount from './createAccount'

function Login(props){
    //require("dotenv").config({ silent: true })

    //const backend = process.env.REACT_APP_BACKEND
    //console.log(backend)

    let [urlSearchParams] = useSearchParams()

    const [response, setResponse] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const qsError = urlSearchParams.get("error")
        if (qsError == "home")
        setErrorMessage("Please log in to view the protected content.")
    }, [])

    useEffect(() => {

        if(response.success && response.token){
        console.log(`User successfully logged in: ${response.username}`);
        localStorage.setItem("token", response.token)
        }
    },[response])

    const handleSubmit = async e => {
        e.preventDefault()

        
        try{
            const requestData = {
                username: e.target.username.value,
                password: e.target.password.value
            }
            console.log(process.env.BACK_END_DOMAIN)
            console.log(process.env.REACT_APP_USERNAME)
            console.log(requestData.password)
            console.log(requestData.username)
            const response = await axios.post(
            `http://localhost:5000/login`,
                requestData
            )
            
        console.log(`Server response: ${JSON.stringify(response.data, null, 0)}`)
        setResponse(response.data)
    }catch(err){
        setErrorMessage(
            "You have entered invalid credentials"
        )
    }
}



    if(!response.success)
        return(
            <div className="Login">
                <header>Login</header>
                {errorMessage ? <p className="error">{errorMessage}</p> : ""}
                <form onSubmit={handleSubmit}>{

                }
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter Username"></input>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter Password"></input>
                    <input type="submit" value="Log In"/>
                </form>

                <Link to="/createAccount" >Sign Up</Link>
            </div>
        )

    else return <Navigate to="/home"/>
}
export default Login;