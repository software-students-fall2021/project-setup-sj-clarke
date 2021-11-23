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

  useEffect(() => {
    // a nested function that fetches the data

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      // mockaroo api call for list of friends in json file format
      const username = process.env.USERNAME;
      const response_current_group = await axios(`/CurrentGroup/sjclarke`);
      console.log({ username });
      let query = `/Transactions/${response_current_group.data}`;
      //console.log({ response_current_group, query });
      const response = await axios(query);
      // Extract the data from the server response
      // Set transactions to this data so we can render the rows of the home screen table with the transactions
      setTransactions(response.data);
      const hold = response.data;
      console.log({ hold });
      getYouOwe(response, username); // response.data instead of transaction
      getOweYou(response, username);
      console.log(youOwe);
      console.log(oweYou);
      // setTransactions(response);
    }
    async function getYouOwe(response, username) {
      var transactions = await response.data;
      for (var i = 0; i < transactions.length; i++) {
        // if the current user is charged by someone
        if (transactions[i].chargee.indexOf(username) !== -1) {
          var owe = youOwe;
          //console.log(owe);
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
          setYouOwe(owe);
        }
      }
    }
    async function getOweYou(response, username) {
      var transactions = await response.data;
      for (var i = 0; i < transactions.length; i++) {
        var willoweyou = oweYou;
        if (transactions.charger === username) {
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

    // fetch the data
    fetchData();

    // console.log({ youOwe });
    // the blank array below causes this callback to be executed only once on component load
  }, []);

  return (
    <div>
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
          {Object.entries(youOwe).map(([key, value]) => {
            <tr key={key}>
              <td>{key}</td>
              <td>{value.toString()}</td>
              <td>
                <button
                  className="btn-xx"
                  onClick={() => {
                    setChargee(key);
                    setAmount(value.toString());
                    setSettleUpModal(TextTrackCueList);
                  }}
                >
                  Settle Up
                </button>
              </td>
            </tr>;
          })}
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
          {Object.entries(oweYou).map(([key, value]) => {
            <tr key={key}>
              <td>{key}</td>
              <td>{value.toString()}</td>
            </tr>;
          })}
        </tbody>
      </ReactBootStrap.Table>
      <SettleUp
        show={showModal}
        setModal={setSettleUpModal}
        amount={setAmount}
      />
    </div>
  );
}
export default MoreInfo;
