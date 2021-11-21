import React, { useState, useEffect } from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./modal.css";
import axios from "axios";
function AddExpenseModal({ show, setModal }) {
  const handleClose = () => {
    setModal(false);
    handleTransactionSubmit();
  };

  // hook JSON to hold the data of a new friend addition
  // GOTTA WORK ON THIS
  const [newExpense, setNewExpense] = useState({
    charger: "",
    chargee: "",
    amount: "",
    description: "",
    date: "",
  });
  const [newTransactionAmount, setNewTransactionAmount] = useState("");
  const [newTransactionMembers, setNewTransactionMembers] = useState([]);
  const [newTransactionDescription, setNewTransactionDescription] =
    useState("");
  const [newTransactionDate, setNewTransactionDate] = useState("");
  const [currentGroup, setCurrentGroup] = useState();

  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // GET curent user's current group
      const username = process.env.DB_username;
      const response_current_group = await axios(`/CurrentGroup/${username}`);
      // Extract current group from the response from backend
      setCurrentGroup(response_current_group.data);
    }
    // fetch the data
    fetchData();
    // the blank array below causes this callback to be executed only once on component load
  }, []);

  const handleTransactionSubmit = () => {
    const username = process.env.DB_username;
    newExpense.charger = username;
    newExpense.chargee = newTransactionMembers;
    newExpense.amount = newTransactionAmount;
    newExpense.description = newTransactionDescription;
    newExpense.date = newTransactionDate;
    axios.post(`/Transactions/${currentGroup}`, newExpense);
    // clear the input line
    setNewExpense({
      charger: "",
      chargee: "",
      amount: "",
      description: "",
      date: "",
    });
  };
  const handleTransactionAmountChange = (event) => {
    // const newdata = { newTransactionAmount };
    const newdata = event.target.value;
    setNewTransactionAmount(newdata);
    console.log(newdata);
  };
  const handleTransactionMembersChange = (event) => {
    const newdata = event.target.value;
    const splitter = newdata.trim().split(",");
    setNewTransactionMembers(splitter);
    console.log(newdata);
  };
  const handleDescriptionChange = (event) => {
    const newdata = event.target.value;
    setNewTransactionDescription(newdata);
    console.log(newdata);
  };
  const handleDateChange = (event) => {
    const newdata = event.target.value;
    setNewTransactionDate(newdata);
    console.log(newdata);
  };

  // handles changes to the add friend form within "add friend" modal

  return (
    <div>
      <ReactBootStrap.Modal
        size="lg"
        show={show}
        onHide={() => setModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ReactBootStrap.Modal.Header closeButton className="Modal">
          <ReactBootStrap.Modal.Title id="example-modal-sizes-title-lg">
            Add Expense
          </ReactBootStrap.Modal.Title>
        </ReactBootStrap.Modal.Header>
        <ReactBootStrap.Modal.Body>
          <ReactBootStrap.Form
            className="addExpense"
            onSubmit={(e) => handleTransactionSubmit(e)}
          >
            With you and (put a comma between multiple group usernames)
            <ReactBootStrap.Form.Control
              onChange={(e) => handleTransactionMembersChange(e)}
              type="email"
              placeholder="Enter Group Member"
            />
            How much was the transaction?
            <ReactBootStrap.Form.Control
              onChange={(e) => handleTransactionAmountChange(e)}
              type="email"
              placeholder="Enter Amount"
            />
            Add a description of the transaction
            <ReactBootStrap.Form.Control
              onChange={(e) => handleDescriptionChange(e)}
              type="email"
              placeholder="Description"
            />
            Add date of transaction in mm/dd/yyyy
            <ReactBootStrap.Form.Control
              onChange={(e) => handleDateChange(e)}
              type="email"
              placeholder="Date"
            />
          </ReactBootStrap.Form>
        </ReactBootStrap.Modal.Body>
        <ReactBootStrap.Modal.Footer>
          <ReactBootStrap.Button variant="light" onClick={handleClose}>
            Cancel
          </ReactBootStrap.Button>
          <ReactBootStrap.Button onClick={handleClose}>
            Save
          </ReactBootStrap.Button>
        </ReactBootStrap.Modal.Footer>
      </ReactBootStrap.Modal>
    </div>
  );
}

export default AddExpenseModal;
