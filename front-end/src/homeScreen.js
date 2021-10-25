import './header.css';
import React from 'react'
import './homeScreen.css'


import * as ReactBootStrap from "react-bootstrap"; 

function Home(){
    // dummy data for summary of current trip transactions
    const transactions =  [
  
        {charger: "Sarah-Jane", chargee:  "Sam", expense: "$50"},
        {charger: "Sarah", chargee:  "Liv", expense: "190"}
        ]
        
    // creating a row for each instance within JSON file holding all of the transactions
    const renderRow = (transaction, index) => {
    // 1 row instance within a table 
    return (
    <tr key = {index}>
      <td>{transaction.charger}</td>
      <td>{transaction.chargee}</td>
      <td>{transaction.expense}</td>
    </tr>
    )
    }
    // general layout of home screen 
    // use map to loop through all transactions and render a row for each one and display on home screen
      return (
        <div className= "Home">
        <title className ="CurrentTripTitle">Mexico 2021
        <button type="button" class="btn btn-secondary btn-sm">More info</button>
        </title>  
        <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
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