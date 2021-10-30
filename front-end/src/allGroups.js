import React, {useState} from 'react'
import './allGroups.css'
import './modal.css'
import * as ReactBootStrap from "react-bootstrap"
import { Container, Row, Col } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./mockGroups.json"
import groupData from "./mockGroupData.json"
import memData from "./mockMembers.json"

function AllGroups(){
    
    // Data of all groups in table
    const [groups] = useState(data)

    // Data of specific group info 
    const [indivGroups] = useState(groupData)

    // Data of members in table
    const [members] = useState(memData)

    // variables to control various modals' open/close
    const [infoOpen, setModalOpen] = useState(false)
    const [seeMemModal, setMemModal] = useState(false)
    
    const handleInfoClose = () => {setModalOpen(false)};
    const handleInfoShow = () => {setModalOpen(true)};

    const handleMemClose = () => {setMemModal(false)};
    const handleMemShow = () => {setMemModal(true)};
    
    return (
      <Container>
      <Row>
        <Col>
          <h1> All Groups({data.length})</h1>
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
                <td>{group.date}</td>
                <td>{group.groupName}</td>
                <td>
                <button className="btn btn-secondary btn-sm" 
                    onClick={handleInfoShow}>more info
                </button>
                <Modal 
                  show={infoOpen}
                  onHide={handleInfoClose}
                  aria-labelledby="example-modal-sizes-title-lg"
                  >
                  <Modal.Header closeButton className="Modal">
                    <Modal.Title id="example-modal-sizes-title-lg" >
                   
                     {group.groupName}   ({group.date})
                      <button className="btn btn-secondary btn-sm" 
                        onClick={handleMemShow}>See Members
                      </button>
                      <Modal 
                        show={seeMemModal}
                        onHide={handleMemClose}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Header closeButton className="Modal">
                          <Modal.Title id="example-modal-sizes-title-lg" >
                            Members({ memData.length })
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <ReactBootStrap.Table striped bordered hover>
                        <thead>
                        <tr>
                          <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((member)=> (
                          <tr key={member.id}>
                            <td>{member.memberName}</td>
                          </tr>
                        ))}
                      </tbody>
                      </ReactBootStrap.Table>
                      </Modal.Body>
                      <Modal.Footer>
                        <button onClick={handleMemClose}
                          className="btn btn-secondary btn-sm">exit
                        </button>
                      </Modal.Footer>
                      </Modal>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                <button onClick={handleInfoClose} type="button" 
                  className="btn btn-secondary btn-sm">exit
                </button>
                </Modal.Footer>
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
