import './header.css';
import './homeScreen.css'
import {Link} from 'react-router-dom'

import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap"; 
import axios from 'axios';


function Home(){
    // Hold all transactions for current group to display on home screen 
    const [transactions, setTransactions] = useState([]);  

    // we will need to get the current user from the login and set it here
    // for now I am using 1 current user. 
    const [currentUser, setCurrentUser] = useState(); 
    const [currentGroup, setCurrentGroup] = useState(); 
    
    useEffect(() => {
      // a nested function that fetches the data
      async function fetchData() {
  
        // GET curent user's current group
        const response_current_group = await axios(
          "/CurrentGroup/sjclarke"
          ); 
  

        // Extract current group from the response from backend 
        setCurrentGroup(response_current_group.data)
  

        // Query all transactions for the current group  
        let query = `/Transactions/${response_current_group.data}`
        const response = await axios(
          query
        ); 


        // Extract the data from the server response
        // Set transactions to this data so we can render the rows of the home screen table with the transactions
        setTransactions(response.data); 
        }
      // fetch the data
      fetchData();
      
      
      // the blank array below causes this callback to be executed only once on component load
    }, []);

    const index = 1; 


    // creating a row for each instance within JSON file holding all of the transactions
    const renderRow = (transaction, index) => {
    // 1 row instance within a table 
    return (
    <tr key = {index}>
      <td>{transaction.date.split("T")[0]}</td>
      <td>{transaction.charger}</td>
      <td>{transaction.chargee}</td>
      <td className = "expenseColumn">${transaction.amount}</td>
    </tr>
    )
    }
    // general layout of home screen 
      return (
        <div className= "Home">
        <title className ="CurrentTripTitle">Current Group: {currentGroup}
        <Link to="/MoreInfo" className="btn btn-secondary btn-sm">More info</Link>
        </title>  
        <ReactBootStrap.Table striped bordered hover>
            <thead className = "headers">
              <tr>
                <th>Date</th>
                <th>Charger</th>
                <th>Chargee</th>
                <th>Amount</th>
              </tr>
          </thead>
          <tbody className = "table">
            {transactions.map(renderRow)}
          </tbody>
        </ReactBootStrap.Table>
      </div>
      )
}
export default Home;