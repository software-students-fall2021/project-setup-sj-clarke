import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./modal.css";

function SettleUp({ showModal, setModal, amount, username, user, transaction}) {

  console.log(transaction)
  const handleYesClose = () => {
    
    // remove me from list of chargees 
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
            Settle Up {amount} with {username}?
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
