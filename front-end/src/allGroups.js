import React, { useState, useEffect } from "react";
import "./allGroups.css";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-modal";
import axios from 'axios';

function AllGroups() {
  // variables needed for all groups page and modals
  const [groups, setGroups] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(() => {
   // a nested function that fetches the data

    async function fetchData() {
      // Extract Mockaroo data
      // get all groups
      const response_groups = await axios("/AllGroups/username");
      // set groups with the data retrieved from mockaroo
      setGroups(response_groups.data);
      // get all transactions for a group
      // currently mock data from mockaroo
      const response_groupData = await axios("/Transactions");
      // set transactions
      setTransactions(response_groupData.data);

     // get all of the members for a group from mockaroo 
     const response_members = await axios(
      "/Members"
    ); 
    // set members
    setMembers(response_members.data);

     }
   // fetch the data
   fetchData();
   
   // the blank array below causes this callback to be executed only once on component load
 }, []);
  
  const [groupName, setGroupName] = useState(" ");
  const [groupDate, setGroupDate] = useState(" ");

  // variables to control various modals' open/close
  const [infoOpen, setModalOpen] = useState(false);
  const [seeMemModal, setMemModal] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <h1> All Groups({groups.length})</h1>
        </Col>
      </Row>
      <div className="AllGroups">
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td>{group.year}</td>
                <td>{group.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      {
                        setModalOpen(true);
                        setGroupName(group.name);
                        setGroupDate(group.year);
                      }
                    }}
                  >
                    more info
                  </button>
                  <Modal isOpen={infoOpen}>
                    <h1 className="modal-title">{groupName}</h1>
                    <h3>{groupDate}</h3>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setMemModal(true);
                      }}
                    >
                      See Members
                    </button>
                    <Modal isOpen={seeMemModal}>
                      <h className="modal-title">Members({members.length})</h>
                      <ReactBootStrap.Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr key={member.id}>
                              <td>{member.username}</td>
                            </tr>
                          ))}
                        </tbody>
                      </ReactBootStrap.Table>
                      <button
                        onClick={() => setMemModal(false)}
                        type="button"
                        className="btn btn-secondary btn-sm"
                      >
                        exit
                      </button>
                    </Modal>
                    <ReactBootStrap.Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Charger</th>
                          <th>Chargee</th>
                          <th>Expense Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.charger}</td>
                            <td>{transaction.chargee}</td>
                            <td>${transaction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </ReactBootStrap.Table>
                    <button
                      onClick={() => setModalOpen(false)}
                      type="button"
                      className="btn btn-secondary btn-sm"
                    >
                      exit
                    </button>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    </Container>
  );
}
export default AllGroups;
