import './header.css';
import './homeScreen.css'
import {Link} from 'react-router-dom'
import Modal from "react-modal";
import React, { useEffect, useState, Navigate } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";

require('dotenv').config()


function Home(props){
    // log in info
    const username = process.env.REACT_APP_USERNAME;
    const jwtToken = localStorage.getItem("token")
    console.log(`JWT token: ${jwtToken}`)

    const [response, setResponse] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true)
    // Hold all transactions for current group to display on home screen 
    const [transactions, setTransactions] = useState([]);  
    const [date, setDate] = useState(); 
    const [charger, setCharger] = useState(); 
    const [chargee, setChargee] = useState([]); 
    const [amount, setAmount] = useState(); 
    const [description, setDescription] = useState(); 
    const [currentGroup, setCurrentGroup] = useState(); 
    const [transactionInfoModal, setTransactionInfoModal] = useState(false); 
    const [totalExpense, setTotalExpense] = useState();
    // setting current user as the logged in user from local storage
    const [uName, setUName] = useState(localStorage.getItem("loggedInUser"));

   
  useEffect(() => {
    console.log(jwtToken)
    
    axios
      .get(`${process.env.REACT_APP_BACK_END_DOMAIN}/home`, {
        headers: { Authorization: `JWT ${jwtToken}` },
      })
      .then(res => {
        setResponse(res.data)
      })
      .catch(err => {
        console.log(jwtToken);
        console.log(
          "The server rejected the request for this protected resource.. we probably don't have a valid JWT token."
        )
        setIsLoggedIn(false)
      })

      async function fetchData() {
        // GET curent user's current group
        const username = process.env.REACT_APP_USERNAME;
        const response_current_group = await axios(`/CurrentGroup/${uName}`)//, // { headers: { Authorization: `JWT ${jwtToken}` } });
        console.log(response_current_group.data);
        // Extract current group from the response from backend
        setCurrentGroup(response_current_group.data);
        // Query all transactions for the current group
        const response = await axios(`/Transactions/${response_current_group.data}`)// , { headers: { Authorization: `JWT ${jwtToken}` } });
        // Set transactions to this data so we can render the rows of the home screen table with the transactions
        setTransactions(response.data);
      }
      // fetch the data
      fetchData();


  },[])

    const index = 1; 
  
    // general layout of home screen 
      return (
        <>
        {isLoggedIn ? (
  
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
                    <td> {Object.keys(outerElement.chargee).map(oneChargee => 
                        <tr key = {outerElement.id}>
                            <td>{oneChargee.trim()}</td>
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
          <p className = "transaction-info">Chargee: {Object.keys(chargee)}</p>
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
        ) : (
          <Link to="/login?error=home"/>
        )}
    </>
  )

}


export default Home
