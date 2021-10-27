import React, {useState} from 'react'
import './allGroups.css'
import * as ReactBootStrap from "react-bootstrap"
import { Container, Row, Col } from 'react-bootstrap'
import { Button} from 'react-bootstrap';
import Title from './header.js'
import Modal from 'react-modal'
import data from "./mockGroups.json"
import groupData from "./mockGroupData.json"

function AllGroups(){
    
    // Data in table that will be used and can be updated dynamically
    const [groups, setGroups] = useState(data)
    const [indivGroups, setIndivGroups] = useState(groupData)
    const [infoOpen, setModalOpen] = useState(false)
    const [seeMemModal, setMemModal] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [show, setShow] = useState(false)
    
      return (
      <Container>
      <Row>
        <Col>
          <h1> All Groups({ data.length })</h1>
        </Col>
       </Row>
       <div className= "AllGroups">
       <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group)=> (
               <tr key={group.id}>
                <td>{group.date}</td>
                <td>{group.groupName}</td>
                <td>
                <button type="button" className="btn btn-secondary btn-sm" 
                    onClick ={() => {setModalOpen(true)}}>more info
                </button>
                <Modal isOpen = {infoOpen}>
                  <h1 className = "modal-title">{group.groupName}</h1>
                  <h3>{group.date}</h3>
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
                  {indivGroups.map((indivGroup)=> (
                    <tr key={indivGroup.id}>
                      <td>{indivGroup.date}</td>
                      <td>{indivGroup.charger}</td>
                      <td>{indivGroup.chargee}</td>
                      <td>{indivGroup.expenseAmount}</td>
                    </tr>
                  ))}
                </tbody>
                </ReactBootStrap.Table>
                <button onClick ={() => setModalOpen(false)} type="button" 
                  className="btn btn-secondary btn-sm">exit
                </button>
                </Modal>
                
                </td>
               </tr>
            ))
            }
          </tbody>
        </ReactBootStrap.Table>
       
      </div>
      </Container>

    )
    
  
  
        
      
}

export default AllGroups;