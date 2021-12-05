import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./modal.css";
import axios from "axios";

function SettleUp({ showModal, setModal, amount, charger, currentuser, transactionIDArr, currentgroup}) {

  console.log({charger})
  console.log({currentuser})
  console.log({transactionIDArr})

  async function handleYesClose() {
    

    const response = await axios(`/Transactions/${currentgroup}`);
    console.log(response.data)
    for (var i = 0; i < transactionIDArr.length; i++){
      for (var j = 0; j < response.data.length; j++){
        if (transactionIDArr[i] === response.data[j]._id){
          // then update 
          axios.post(`/updateTransaction/${currentgroup}/${transactionIDArr[i]}/${currentuser}`);
        }
      }
    }
    
    setModal(false);
  }
  


  const handleNoClose = () => {
    setModal(false);

  }


  return (
    <div>
      <ReactBootStrap.Modal
        size="lg"
        show={showModal}
        onHide={() => setModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ReactBootStrap.Modal.Header closeButton className="Modal">
          <ReactBootStrap.Modal.Title id="example-modal-sizes-title-lg">
            Settle Up {amount} with {charger}?
          </ReactBootStrap.Modal.Title>
        </ReactBootStrap.Modal.Header>
        <ReactBootStrap.Modal.Footer>
          <ReactBootStrap.Button variant="light" onClick={handleNoClose}>
            No
          </ReactBootStrap.Button>
          <ReactBootStrap.Button onClick={handleYesClose}
          >
            Yes
          </ReactBootStrap.Button>
        </ReactBootStrap.Modal.Footer>
      </ReactBootStrap.Modal>
    </div>
  );
}
export default SettleUp;
