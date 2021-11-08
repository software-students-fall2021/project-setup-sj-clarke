import './header.css';
import './homeScreen.css'
import {Link} from 'react-router-dom'

import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap"; 
import axios from 'axios';


function Home(){
    
  
    // creating a row for each instance within JSON file holding all of the transactions
    const [transactions, setTransactions] = useState([]);  
    useEffect(() => {
      // a nested function that fetches the data
    
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        // Mockaroo data for summary of current trip transactions
        const response = await axios(
          "/Transactions"
        ); 
        // extract the data from the server response
        setTransactions(response.data); 
        }
      // fetch the data
      fetchData();
      
      
      // the blank array below causes this callback to be executed only once on component load
    }, []);


   
    // creating a row for each instance within JSON file holding all of the transactions
    const renderRow = (transaction, index) => {
    // 1 row instance within a table 
    return (
    <tr key = {transaction.id}>
      <td>{transaction.date}</td>
      <td>{transaction.charger}</td>
      <td>{transaction.chargee}</td>
      <td className = "expenseColumn">${transaction.amount}</td>
    </tr>
    )
    }
    // general layout of home screen 
    // use map to loop through all transactions and render a row for each one and display on home screen
      return (
        <div className= "Home">
        <title className ="CurrentTripTitle">Mexico 2021
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