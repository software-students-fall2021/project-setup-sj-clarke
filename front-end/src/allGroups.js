import React, {useState} from 'react'
import './allGroups.css'
import * as ReactBootStrap from "react-bootstrap";
import Title from './header.js'

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


    )
}
export default AllGroups;