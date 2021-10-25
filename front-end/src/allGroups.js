import React from 'react'
import './allGroups.css'
import { Form, Button, NavLink} from 'react-bootstrap';
import Title from './header.js'
import * as ReactBootStrap from "react-bootstrap"; 

function AllGroups(){
     // dummy data for summary of current trip transactions
     const groups =  [
  
        {date: "Sep 2021", trip:  "Mexico"},
        {date: "Aug 2019", trip:  "Paris"}
        ]
        
    // creating a row for each instance within JSON file holding all of the transactions
    const renderRow = (group, index) => {
        return (
            <tr key = {index}>
              <td>{group.date}</td>
              <td>{group.trip}</td>
            </tr>
            )
    }
    return (
        <div className= "AllGroups">
        <title>All Groups
        <button type="button" class="btn btn-secondary btn-sm">More info</button>
        </title>  
        <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Group</th>
              </tr>
          </thead>
          <tbody>
            {groups.map(renderRow)}
          </tbody>
        </ReactBootStrap.Table>
      </div>

    )
}
export default AllGroups;