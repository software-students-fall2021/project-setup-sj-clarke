import './header.css';
import './homeScreen.css'
import {Link} from 'react-router-dom'
import mockTransactions from './mockGroupData.json'
import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap"; 

function Home(){
    // dummy data for summary of current trip transactions
    const [transactions, setTransactions] = useState(mockTransactions)

  
        
    // creating a row for each instance within JSON file holding all of the transactions
    const renderRow = (transaction, index) => {
    // 1 row instance within a table 
    return (
    <tr key = {transaction.id}>
      <td>{transaction.date}</td>
      <td>{transaction.charger}</td>
      <td>{transaction.chargee}</td>
      <td>{transaction.expenseAmount}</td>
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
            <thead>
              <tr>
                <th>Date</th>
                <th>Charger</th>
                <th>Chargee</th>
                <th>Expense Amount</th>
              </tr>
          </thead>
          <tbody>
            {transactions.map(renderRow)}
          </tbody>
        </ReactBootStrap.Table>
      </div>

    )
}
export default Home; 