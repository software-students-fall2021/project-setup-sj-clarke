import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import data from "./mockGroupData.json";
import axios from "axios";
import { set } from "react-hook-form";

function MoreInfo() {
  const [groupData, setGroupData] = useState(data);
  const [transactions, setTransactions] = useState({});
  const [youOwe, setYouOwe] = useState({});
  const [oweYou, setOweYou] = useState({});
  useEffect(() => {
    // a nested function that fetches the data

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      // mockaroo api call for list of friends in json file format
      const response_current_group = await axios("/CurrentGroup/sjclarke");
      let query = `/Transactions/${response_current_group.data}`;
      //console.log({ response_current_group, query });
      const response = await axios(query);
      // Extract the data from the server response
      // Set transactions to this data so we can render the rows of the home screen table with the transactions
      setTransactions(response.data);
      console.log(transactions);
      getYouOwe(transactions, "sjclarke ");
      getOweYou(transactions, "sjclarke ");
      console.log({ oweYou });
      console.log({ youOwe });

      // setTransactions(response);
    }

    // fetch the data
    fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);

  function getYouOwe(transactions, username) {
    console.log(transactions[0]);
    for (var i = 0; i < transactions.length; i++) {
      // if the current user is charged by someone
      if (transactions[i].chargee.indexOf(username) != -1) {
        var owe = youOwe;
        console.log(owe);
        if (owe.hasOwnProperty(transactions[i].charger)) {
          console.log("contains");
          var amount_to_add = Number(transactions[i].amount);
          var split_amount_to_add =
            amount_to_add / (transactions[i].chargee.length + 1);
          var amount_before_add = owe[transactions[i].charger];
          owe[transactions[i].charger] =
            amount_before_add + split_amount_to_add;
        } else {
          console.log("doesnt contain.. adding rn");
          var amount_to_add = Number(transactions[i].amount);
          var split_amount_to_add =
            amount_to_add / (transactions[i].chargee.length + 1);
          owe[transactions[i].charger] = split_amount_to_add;
        }
        console.log(owe);
        setYouOwe(owe);
        console.log(youOwe);
      }
    }
  }
  function getOweYou(transactions, username) {
    for (var i = 0; i < transactions.length; i++) {
      var willoweyou = oweYou;
      if (transactions.charger == username) {
        var chargees = transactions[i].chargee;
        var amount_before_split = transactions[i].amount;
        var amount_after_split = amount_before_split / chargees.length + 1;
        for (var j = 0; i < chargees.length; j++) {
          if (willoweyou.hasOwnProperty(chargees[j])) {
            willoweyou[chargees[j]] =
              willoweyou[chargees[j]] + amount_after_split;
          } else {
            willoweyou[chargees[j]] = amount_after_split;
          }
        }
      }
      setOweYou(willoweyou);
    }
  }

  const renderOweYou = (transaction, index) => {
    return (
      <div key={index}>
        <ReactBootStrap.Alert variant="success">
          {transaction.chargee} owes you {transaction.expenseAmount} dollars
        </ReactBootStrap.Alert>
      </div>
    );
  };
  const renderYouOwe = (transaction, index) => {
    // 1 row instance within a table

    // if (transaction.chargee === "Gal") {
    return (
      <div key={index}>
        <ReactBootStrap.Alert variant="danger">
          You owe {transaction.expenseAmount} to {transaction.charger}
        </ReactBootStrap.Alert>
      </div>
    );
    //}
  };

  return (
    <div>
      {console.log(youOwe)}
      <h1>You Owe</h1>
      {/* {youOwe.map(renderYouOwe)} */}
      <h1>Owe You</h1>
      {/* {oweYou.map(renderOweYou)} */}
    </div>
  );
}
export default MoreInfo;
