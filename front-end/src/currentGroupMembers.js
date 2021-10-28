import React from "react";
import * as ReactBootStrap from "react-bootstrap";

function CurrentGroupMembers({ tripName }) {
  // dummy data for summary of current trip transactions
  const names = [{ name: "Sarah-Jane" }, { name: "Sarah" }, { name: "Gal" }];

  // creating a row for each instance within JSON file holding all of the transactions
  const renderRow = (member, index) => {
    // 1 row instance within a table
    return (
      <tr key={index}>
        <td>{member.name}</td>
      </tr>
    );
  };
  // general layout of home screen
  // use map to loop through all transactions and render a row for each one and display on home screen
  return (
    <div className="Home">
      <title className="CurrentTripTitle">
        {" "}
        {`${tripName} Current Group Members `}
      </title>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{names.map(renderRow)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}
export default CurrentGroupMembers;
