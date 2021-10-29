import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import data from "./mockGroupData.json";

function MoreInfo() {
  const [groupData, setGroupData] = useState(data);

  const renderOweYou = (transaction, index) => {
    // 1 row instance within a table

    if (transaction.charger === "Gal") {
      return (
        <div key={index}>
          <ReactBootStrap.Alert variant="success">
            {transaction.chargee} owes you ${transaction.expenseAmount} dollars
          </ReactBootStrap.Alert>
        </div>
      );
    }
  };
  const renderYouOwe = (transaction, index) => {
    // 1 row instance within a table

    if (transaction.chargee === "Gal") {
      return (
        <div key={index}>
          <ReactBootStrap.Alert variant="danger">
            You owe ${transaction.expenseAmount} to {transaction.charger}
          </ReactBootStrap.Alert>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>You Owe</h1>
      {groupData.map(renderYouOwe)}
      <h1>Owe You</h1>
      {groupData.map(renderOweYou)}
    </div>
  );
}
export default MoreInfo;
