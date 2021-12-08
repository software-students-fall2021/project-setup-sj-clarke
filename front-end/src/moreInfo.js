import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import data from "./mockGroupData.json";
import axios from "axios";
import { set } from "react-hook-form";
import SettleUp from "./settleUpModal";

function MoreInfo({ setSettleUpModal, setAmount, setChargee }) {
  const [groupData, setGroupData] = useState(data);
  const [transactions, setTransactions] = useState({});
  const [youOwe, setYouOwe] = useState({});
  const [oweYou, setOweYou] = useState({});
  const [showModal, setModal] = useState(false);
  const [amount, setModalAmount] = useState();
  const [user, setModalUser] = useState(" ");
  const [settleUp, setSettleUp] = useState({}); 
  const [finalTransactions, setFinalTransactions] = useState({})
  const [arrOfYouOwe, setarrOfYouOwe] = useState([]);
  const [arrOfTransactions, setarrOfTransactions] = useState([]); 
  const [arrOfOweYou, setarrOfOweYou] = useState([]);
  const [finalTransaction, setFinalTransaction] = useState({});
  const [transactionArray, setTransactionArray] = useState({}); 
  const [currentGroup, setCurrentGroup] = useState("")
  // name : [930303, 400404]
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("loggedInUser"));
  useEffect(() => {
    // a nested function that fetches the data

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      // mockaroo api call for list of friends in json file format
      var chargeesArr = []; 
      const response_current_group = await axios(`/CurrentGroup/${currentUser}`);
      setCurrentGroup(response_current_group.data)
      //console.log({ username });
      let query = `/Transactions/${response_current_group.data}`;
      //console.log({ response_current_group, query });
      const response = await axios(query);
      // Extract the data from the server response

      console.log(response)
      // Set transactions to this data so we can render the rows of the home screen table with the transactions
      for (var i = 0; i < response.data.length; i++) {
        var transaction = response.data[i];
        var charger = transaction.charger;
        chargeesArr = Object.keys(transaction.chargee); 
        console.log(Object.keys(transaction.chargee))
        const names = Object.keys(transaction.chargee)
        const valid = Object.values(transaction.chargee)
        console.log(names); 
        console.log(valid)

        if (names.indexOf(currentUser) !== -1){
            for (var j = 0; j < names.length; j++){
              if (names[j] == currentUser){
                if (valid[j] == 0){
                  if (chargeesArr.indexOf(currentUser) !== -1) {
                    // add to id array transaction.id_
                    var amount_to_add = Number(transaction.amount);
                    amount_to_add = amount_to_add / (chargeesArr.length + 1);
                    console.log(transaction._id); 
        
                    if (transactionArray.hasOwnProperty(charger)){
                      transactionArray[charger].push(transaction._id)
                    }
                    else{
                      transactionArray[charger] = [transaction._id]
                      
                    }
                    console.log(transactionArray)
                    if (youOwe.hasOwnProperty(charger)) {
                      youOwe[charger] += amount_to_add;
                    } else {
                      youOwe[charger] = amount_to_add;
                    }
                    setYouOwe(youOwe);
                  }

                }
                
              }
            }
        }


        // if (chargeesArr.indexOf(username) !== -1) {
        //     // add to id array transaction.id_
        //     var amount_to_add = Number(transaction.amount);
        //     amount_to_add = amount_to_add / (chargeesArr.length + 1);
        //     console.log(transaction._id); 

        //     if (transactionArray.hasOwnProperty(charger)){
        //       transactionArray[charger].push(transaction._id)
        //     }
        //     else{
        //       transactionArray[charger] = [transaction._id]
              
        //     }
        //     console.log(transactionArray)
        //     if (youOwe.hasOwnProperty(charger)) {
        //       youOwe[charger] += amount_to_add;
        //     } else {
        //       youOwe[charger] = amount_to_add;
        //     }
        //     setYouOwe(youOwe);
        //   }
          }
         
    
      var res = Object.keys(youOwe).map(function (name) {
        var obj = {
          name: "",
          amount: "",
        };
        // console.log({ name });
        // console.log(youOwe[name]);
        obj.name = name;
        obj.amount = youOwe[name];
        return obj;
      });
      console.log(res); 
      setarrOfYouOwe(res);

      console.log(arrOfOweYou)

      setYouOwe({});

      for (var i = 0; i < response.data.length; i++) {
        const transaction = response.data[i];
        const charger = transaction.charger;
        const chargees = transaction.chargee;
        chargeesArr = Object.keys(transaction.chargee); 

        if (charger === currentUser) {
          for (var j = 0; j < chargeesArr.length; j++) {
            const chargee = chargeesArr[j]
            
            var to_add = Number(transaction.amount);

            to_add /= chargeesArr.length + 1;
            if (oweYou.hasOwnProperty(chargee)) {
              oweYou[chargee] += to_add;
            } else {
              oweYou[chargee] = to_add;
            }
            
            setOweYou(oweYou);
          }
        }
      }

      var count = 0; 
      // console.log({ oweYou });
      var res2 = Object.keys(oweYou).map(function (name2) {
        var obj = {
          name: "",
          amount: "",
        };

        obj.name = name2;
        obj.amount = oweYou[name2];
        const name = obj.name;
        const amount = obj.amount;
        return obj;
      });
      setarrOfOweYou(res2);
      setOweYou({});
    }

    // fetch the data
    fetchData();
    // the blank array below causes this callback to be executed only once on component load
  }, [transactions]);

  console.log(youOwe);

  return (
    <div>
      {/* {console.log(username)} */}
      <h1>You Owe</h1>
      <ReactBootStrap.Table striped bordered hover>
        <thead className="headers">
          <tr>
            <th>Charger</th>
            <th>Amount</th>
            <th>Settle Up?</th>
          </tr>
        </thead>
        <tbody className="table">
          {arrOfYouOwe.map((obj) => (
            <tr key={obj.name}>
              <td>{obj.name}</td>
              <td>${obj.amount}</td>
              <td>
                <button
                  className="btn-xx"
                  onClick={() => {
                    setModal(true);
                    setModalAmount(obj.amount);
                    setModalUser(obj.name); 
                  }}
                >
                  Settle Up
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
      <h1>Owe You</h1>
      <ReactBootStrap.Table striped bordered hover>
        <thead className="headers">
          <tr>
            <th>Chargee</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className="table">
          {arrOfOweYou.map((obj) => (
            <tr key={obj.name}>
              <td>{obj.name}</td>
              <td>${obj.amount}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>

      <SettleUp
        showModal={showModal}
        setModal={setModal}
        amount={amount}
        charger={user} // charger
        currentuser = {currentUser} // current user
        transactionIDArr = {transactionArray[user]}
        currentgroup = {currentGroup}
      />
    </div>
  );
}
export default MoreInfo;