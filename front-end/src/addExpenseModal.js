import React from "react";
import *  as ReactBootStrap from "react-bootstrap";
import './modal.css'
function AddExpenseModal({show, setModal}){
    const handleClose = () => setModal(false);
    return(
        <div >
<ReactBootStrap.Modal
        size="lg"
        show={show}
        onHide={() => setModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ReactBootStrap.Modal.Header closeButton className="Modal">
          <ReactBootStrap.Modal.Title id="example-modal-sizes-title-lg" >
            Add Expense
          </ReactBootStrap.Modal.Title>
        </ReactBootStrap.Modal.Header>
        <ReactBootStrap.Modal.Body>With you and
        <ReactBootStrap.Form.Control type="email" placeholder="Enter Group Member" />
        </ReactBootStrap.Modal.Body>
        <ReactBootStrap.Modal.Footer>
          <ReactBootStrap.Button variant="light" onClick={handleClose}>
            Cancel
          </ReactBootStrap.Button>
          <ReactBootStrap.Button onClick={handleClose}>
            Save
          </ReactBootStrap.Button>
        </ReactBootStrap.Modal.Footer>
      </ReactBootStrap.Modal>
        </div>
    )
}

export default AddExpenseModal;