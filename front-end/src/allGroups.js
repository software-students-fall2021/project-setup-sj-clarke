import React, { useState, useEffect } from "react";
import "./allGroups.css";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-modal";
import axios from 'axios';
import {Link} from 'react-router-dom'

function AllGroups() {
  // variables needed for all groups page and modals
  const [currentUser, setCurrentUser] = useState(" "); 
  const [groups, setGroups] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);
  const jwtToken = localStorage.getItem("token")
  console.log(`JWT token: ${jwtToken}`)
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true)

  
  useEffect(() => {
   // a nested function that fetches the data
      async function fetchData() {
      // Extract Mockaroo data
      // get all groups
      setCurrentUser("sjclarke") 
      
      const response_groups = await axios(`http://localhost:5000/AllGroups/sjclarke`);
      // set groups with the data retrieved from mockaroo
      setGroups(response_groups.data);
      // get all transactions for a group
      // currently mock data from mockaroo
     }
   // fetch the data
   fetchData();
   
   // the blank array below causes this callback to be executed only once on component load
 }, []);


 const [modalGroup, setModalGroup] = useState(" "); 
  async function getTransactions(groupName){
      const response_groupData = await axios(`/Transactions/${groupName}`, { headers: { Authorization: `JWT ${jwtToken}` } });
      // set transactions
      setGroupName(groupName);
      setTransactions(response_groupData.data);
  }


  async function getMembers(groupName){
    const res_members = await axios(`/Members/${groupName}`, { headers: { Authorization: `JWT ${jwtToken}` } });
    // set transactions
    setGroupName(groupName);
    setMembers(res_members.data);
}
  
  const [groupName, setGroupName] = useState(" ");
  const [groupDate, setGroupDate] = useState(" ");

  // variables to control various modals' open/close
  const [infoOpen, setModalOpen] = useState(false);
  const [seeMemModal, setMemModal] = useState(false);

  return (
    <>
    {isLoggedIn ? (
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
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td>{group}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      // eslint-disable-next-line no-lone-blocks
                      {
                        setGroupName(group);
                        setModalOpen(true);
                        getTransactions(group)
                        getMembers(group)
                        setModalGroup(group); 
                      }
                    }}
                  >
                    more info
                  </button>
                  <Modal isOpen={infoOpen} dialogClassName="modal-design">
                    <h1 className="modal-title">Transactions({transactions.length})</h1>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        // eslint-disable-next-line no-lone-blocks
                        {
                          setMemModal(true);
                          setGroupName(group);
                        }
                      }}
                    >
                      See Members
                    </button>
                    <Modal isOpen={seeMemModal} dialogClassName="modal-design">
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
                              <td>{member}</td>
                            </tr>
                          ))}
                        </tbody>
                      </ReactBootStrap.Table>
                      <button
                        onClick={() => {
                          setMemModal(false)
                          setGroupName(modalGroup);
                        }}
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
                            <td>{transaction.date.split("T")[0]}</td>
                            <td>{transaction.charger}</td>
                            <td> {Object.keys(transaction.chargee).map(oneChargee => 
                        <tr key = {transaction.id}>
                            <td>{oneChargee.trim()}</td>
                          </tr>
                    )}</td>
                            <td>${transaction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </ReactBootStrap.Table>
                    <button
                      onClick={() => setModalOpen(false)
                       }
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
    ) : (
      <Link to="/login?error=home"/>
    )}
    </>
  );
}
export default AllGroups;