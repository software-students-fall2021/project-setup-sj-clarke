import { Alert } from 'bootstrap'
import React from 'react'
import * as ReactBootStrap from 'react-bootstrap'

function MoreInfo(){
    const transactions =  [
  
        {charger: "Gal", chargee:  "Sam", expense: "50"},
        {charger: "Gal", chargee:  "Sarah-Jane", expense: "190"},
        {charger: "Gal" , chargee: "Emily" , expense: "100"},
        {charger: "Sam", chargee:  "Gal", expense: "50"},
        {charger: "Sarah-Jane", chargee:  "Gal", expense: "190"},
        {charger: "Emily" , chargee: "Gal" , expense: "100"}
        ]
       

          const renderOweYou = (transaction, index) => {
            // 1 row instance within a table 
           
            if(transaction.charger === "Gal"){
                return(
                    <div>
                    <ReactBootStrap.Alert variant='success' key={index}>
                       {transaction.chargee} owes you ${transaction.expense} dollars
                    </ReactBootStrap.Alert>
                    </div>
                )
            }
            
        }
        const renderYouOwe = (transaction, index) => {
            // 1 row instance within a table 
           
            if(transaction.chargee === "Gal"){
                return(
                    <div >
                    <ReactBootStrap.Alert variant='danger' key={index}>
                        You owe ${transaction.expense} to {transaction.charger}
                    </ReactBootStrap.Alert>
                    </div>
                )
            }
            
        }
     
        
   return(
       <div>
           <h1>You Owe</h1>
           {transactions.map(renderYouOwe)}
           <h1>Owe You</h1>
           {transactions.map(renderOweYou)}
       </div>
       
      
    
   )
} export default MoreInfo