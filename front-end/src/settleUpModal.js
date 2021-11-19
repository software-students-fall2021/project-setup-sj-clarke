import React from "react";
import * as ReactBootStrap from "react-bootstrap";
import "./modal.css";

function SettleUp({ show, setModal, amount, username }) {
  const handleClose = () => setModal(false);

  return (
    <div>
      <ReactBootStrap.Modal
        size="lg"
        show={show}
        onHide={() => setModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ReactBootStrap.Modal.Header closeButton className="Modal">
          <ReactBootStrap.Modal.Title id="example-modal-sizes-title-lg">
            Settle Up {amount} with {username}?
          </ReactBootStrap.Modal.Title>
        </ReactBootStrap.Modal.Header>
        <ReactBootStrap.Modal.Footer>
          <ReactBootStrap.Button variant="light" onClick={handleClose}>
            No
          </ReactBootStrap.Button>
          <ReactBootStrap.Button onClick={handleClose}>
            Yes
          </ReactBootStrap.Button>
        </ReactBootStrap.Modal.Footer>
      </ReactBootStrap.Modal>
    </div>
  );
}
export default SettleUp;
