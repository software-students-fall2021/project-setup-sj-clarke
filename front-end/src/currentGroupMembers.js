import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
function CurrentGroupMembers() {
  const jwtToken = localStorage.getItem("token")
  console.log(`JWT token: ${jwtToken}`)
  // dummy data for summary of current trip transactions
  const [names, setNames] = useState([]);
  const [tripName, setTripName] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true)

  useEffect(() => {
    // a nested function that fetches the data

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      // mockaroo api call for list of friends in json file format
      const username = process.env.REACT_APP_USERNAME;
      const response = await axios(`/CurrentGroupMembers/${username}`);
      // extract the data from the server response

      setNames(response.data);

      const current = await axios(`/CurrentGroup/${username}`);
      setTripName(current.data);
    }

    // fetch the data
    fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);

  // creating a row for each instance within JSON file holding all of the transactions
  const renderRow = (member, index) => {
    // 1 row instance within a table
    return (
      <tr key={index}>
        <td>{member}</td>
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
