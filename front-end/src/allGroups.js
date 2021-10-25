import React from 'react'
import './allGroups.css'
import * as ReactBootStrap from "react-bootstrap";
import Title from './header.js'

function AllGroups(){

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
        <Title/>
        <title className ="Main">All Groups
        </title>  
        <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Group</th>
              </tr>
          </thead>
          <tbody>
            {group.map(renderRow)}
          </tbody>
        </ReactBootStrap.Table>
      </div>

    )
}
export default AllGroups;