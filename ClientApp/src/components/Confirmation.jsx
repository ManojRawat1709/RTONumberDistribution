import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const Confirmation = (props) => {
    const { show, handleClose, numberPlate, navigateTo } = props
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Number Plate Registration</Modal.Title>
            </Modal.Header>

            <Modal.Body className="mx-3 p-5">
                <p>Do you want to register for number plate '{numberPlate }' ? </p>
            </Modal.Body>

            <Modal.Footer>
                <Button className="col-sm-2" variant="success" onClick={navigateTo}>Yes</Button>
                <Button className="col-sm-2" variant="danger" onClick={handleClose}>No</Button>
            </Modal.Footer>
        </Modal>
        );
}
export default Confirmation