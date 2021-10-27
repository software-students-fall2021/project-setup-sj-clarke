import React, {useState} from 'react'
import './allGroups.css'
import * as ReactBootStrap from "react-bootstrap"
import { Container, Row, Col } from 'react-bootstrap'
import { Button} from 'react-bootstrap';
import Title from './header.js'
import data from "./mockGroups.json"

function AllGroups(){
    
    // Data in table that will be used and can be updated dynamically
    const [groups, setGroups] = useState(data)

    // State variable to keep track of all the expanded rows
    // By default, nothing expanded. Hence initialized with empty array.
    const [expandedRows, setExpandedRows] = useState([]);

    // State variable to keep track which row is currently expanded.
    const [expandState, setExpandState] = useState({});
    
    /**
     * This function gets called when show/hide link is clicked.
    */
    const handleExpandRow = (event, userId) => {
      const currentExpandedRows = expandedRows;
      const isRowExpanded = currentExpandedRows.includes(userId);
  
      let obj = {};
      isRowExpanded ? (obj[userId] = false) :  (obj[userId] = true);
      setExpandState(obj);
  
      // If the row is expanded, we are here to hide it. Hence remove
      // it from the state variable. Otherwise add to it.
      const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== userId) :
            currentExpandedRows.concat(userId);
  
      setExpandedRows(newExpandedRows);
    }
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
            {groups.map(()=> group)}
            <tr>
              <td>{group.date}</td>
              <td>{group.groupName}</td>
              <td>
                <Button 
                  variant="link"
                  onClick={event => handleExpandRow(event, group.id)}>
                    {
                      expandState[group.id] ?
                        'Hide' : 'Show'
                    }
                 </Button>
               </td>
            </tr>
            {/* {
               expandedRows.includes(user.id) ?
                  <tr>
                    <td colspan="6">
                      <div style={{backgroundColor: '#343A40', color: '#FFF', padding: '10px'}}>
                        <h2> Details </h2>
                        <ul>
                          <li>
                            <span><b>Full Name:</b></span> {' '}
                            <span> { user['first_name'] } {' '} { user['last_name'] } </span>
                          </li>
                          <li>
                            <span><b>Company:</b></span> {' '}
                            <span> { user.company } </span>
                          </li>
                          <li>
                            <span><b>Department:</b></span> {' '}
                            <span> { user.department } </span>
                          </li>
                          <li>
                            <span><b>Ip:</b></span> {' '}
                            <span> { user['ip_address'] } </span>
                          </li>
                          <li>
                            <span><b>Best Movie:</b></span> {' '}
                            <span> { user.movies } </span>
                          </li>
                          <li>
                            <span><b>About:</b></span> {' '}
                            <span> { user.about } </span>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr> : null
                }
                </>
              </> 
              )} */}
          </tbody>
        </ReactBootStrap.Table>
      </div>
      </Container>

    )
}
export default AllGroups;