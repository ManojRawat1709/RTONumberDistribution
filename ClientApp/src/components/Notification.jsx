import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
    const { show, handleClose, message, heading, typeNotification } = props
    return (
        <Alert show={show} variant={typeNotification} onClose={handleClose} dismissible>
            <Alert.Heading>{ heading}</Alert.Heading>
            {
                message.map((x, index) => {
                    return <p key={index} > {x.a} </p>
                })
            }
        </Alert>
    );
}
export default Notification