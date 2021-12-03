import './header.css';
import './homeScreen.css'
import {Link} from 'react-router-dom'
import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap"; 
import axios from 'axios';


function Home(){
    // Hold all transactions for current group to display on home screen 
    const username = process.env.REACT_APP_USERNAME; 
    const [transactions, setTransactions] = useState([]);  
    const [date, setDate] = useState(); 
    const [charger, setCharger] = useState(); 
    const [chargee, setChargee] = useState([]); 
    const [amount, setAmount] = useState(); 
    const [description, setDescription] = useState(); 
    // we will need to get the current user from the login and set it here
    // for now I am using 1 current user. 
    const [currentUser, setCurrentUser] = useState(); 
    const [currentGroup, setCurrentGroup] = useState(); 
    const [transactionInfoModal, setTransactionInfoModal] = useState(false); 
    const [totalExpense, setTotalExpense] = useState(); 
    useEffect(() => {
      // a nested function that fetches the data
      async function fetchData() {
        // GET curent user's current group
        setCurrentUser(username)
        const response_current_group = await axios(
          `/CurrentGroup/${username}`
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
        setTransactions(response.data.reverse()); 
        }
      // fetch the data
      fetchData();
      // the blank array below causes this callback to be executed only once on component load
    }, []);


    const index = 1; 
  
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
            {transactions.map(outerElement => 
                    <tr key = {outerElement.id}>
                    <td>{outerElement.date.split("T")[0]}</td>
                    <td>{outerElement.charger}</td>
                    <td> {outerElement.chargee.map(oneChargee => 
                        <tr key = {outerElement.id}>
                            <td>{oneChargee}</td>
                          </tr>
                    )}</td>
                    <td className = "expenseColumn">${outerElement.amount}</td>
                    <td><button
                       className="btn-xx"
                        onClick={() => {setTransactionInfoModal(true); 
                          setDate(outerElement.date.split("T")[0]); 
                          setCharger(outerElement.charger);
                          setChargee(outerElement.chargee);
                          setAmount(outerElement.amount);
                          setDescription(outerElement.description);
                          setTotalExpense(outerElement.amount)}}    >
                      info
                    </button>
                    </td>
                  </tr>
                  )
      
                        }
          </tbody>
      <Modal isOpen={transactionInfoModal} dialogClassName="modal-design">
          <h1 className="modal-title">Transaction Information</h1>
          <p className = "transaction-info">Date: {date}</p>
          <p className = "transaction-info">Charger: {charger}</p>
          <p className = "transaction-info">Chargee: {chargee}</p>
          <p className = "transaction-info" >Description: {description}</p>
          <p className = "transaction-info" >Total Expense: ${totalExpense}</p>
              <button
                onClick={() => setTransactionInfoModal(false)}
                type="button"
                className="btn btn-secondary btn-sm"
              >
                close
              </button>
        </Modal>
        </ReactBootStrap.Table>
      </div>

      
      )
}
export default Home;