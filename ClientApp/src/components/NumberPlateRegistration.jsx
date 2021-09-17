import React, { useState } from 'react'
import Notification from './Notification'
import { useHistory } from "react-router-dom";

const NumberPlateRegistration = (props) => {

    const number = props.history.location.state?.data === undefined ? '' : props.history.location.state?.data;
    const [typeNotification, setTypeNotification] = useState('');
    const [header, setHeader] = useState('');
    const [message, setMessage] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [registrationData, setRegistrationData] = useState({ numberPlate: number, firstName: '', lastName: '', Address1: '', Address2: '' });

    const history = useHistory();
    const navigateTo = () => history.push
        ({
            pathname: '/'
        })
    const reset = () => {
        setRegistrationData({ numberPlate: '', firstName: '', lastName: '', Address1: '', Address2: '' });
        handleClose();
    }

    const validation = (e) => {
        let isValid = true;
        if (registrationData.numberPlate === "") {
            setMessage(message => [...message, { a: "Please insert number plate" }]);
            isValid = false;
        }
        if (registrationData.firstName === "") {
            setMessage(message => [...message, { a: "Please insert first name" }]);
            isValid = false;
        }
        if (registrationData.lastName === "") {
            setMessage(message => [...message, { a: "Please insert last name" }]);
            isValid = false;
        }
        if (registrationData.Address1 === "") {
            setMessage(message => [...message, { a: "Please insert Address1" }]);
            isValid = false;
        }
        if (registrationData.Address2 === "") {
            setMessage(message => [...message, { a: "Please insert Address2" }]);
            isValid = false;
        }
        return isValid;
    }
    const register = (e) => {
        setMessage([]);
        e.preventDefault();
        if (!validation()) {
            setHeader("Error Occured")
            setTypeNotification("danger")
        }
        else {
            setHeader("Data Inserted")
            setTypeNotification("success")
            setMessage(message => [...message, { a: "Record inserted successfully for NumberPlate : " + registrationData.numberPlate + " , FirstName : " + registrationData.firstName + " , LastName : " + registrationData.lastName + " , Address1 : " + registrationData.Address1 + " , Address2 : " + registrationData.Address2 + " !!" }]);
        }    
        handleShow();
    }

    const changeHandler = (e) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    }

    const handleClose = () => {
        setShowNotification(false);
    }
    const handleShow = () => {
        setShowNotification(true);
    }

    return (
        <div>
            <form className="border border-light p-5" onSubmit={e => register(e)}>
                {showNotification && <Notification show={showNotification} typeNotification={typeNotification} handleClose={handleClose} message={message}
                    heading={header} />}
                <div className="mb-3 row">
                    <label htmlFor="numberPlate" className="form-label col-sm-2">Number Plate</label>
                    <input type="text" disabled={(registrationData.numberPlate !== '') ? "disabled" : ""} id="numberPlate" name="numberPlate" className="form-control col-sm-10" placeholder="NumberPlate" value={registrationData.numberPlate} onChange={e => changeHandler(e)} />
                </div>
                <div className="mb-3 row">
                    <label htmlFor="firstName" className="form-label col-sm-2">FirstNumber</label>
                    <input type="text" id="firstName" name="firstName" className="form-control col-sm-10" placeholder="FirstName" value={registrationData.firstName} onChange={e => changeHandler(e)} />
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="form-label col-sm-2">LastNumber</label>
                    <input type="text" id="lastName" name="lastName" className="form-control col-sm-10" placeholder="LastName" value={registrationData.lastName} onChange={e => changeHandler(e)} />
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Address1" className="form-label col-sm-2">Address1</label>
                    <input type="text" id="Address1" name="Address1" className="form-control col-sm-10" placeholder="Address1" value={registrationData.Address1} onChange={e => changeHandler(e)} />
                </div>
                <div className="mb-3 row">
                    <label htmlFor="Address2" className="form-label col-sm-2">Address2</label>
                    <input type="text" id="Address2" name="Address2" className="form-control col-sm-10" placeholder="Address2" value={registrationData.Address2} onChange={e => changeHandler(e)} />
                </div>
                <div className="text-center mt-4 mb-3">
                    <button type="submit" id="btnRegister" className="col-sm-2 btn btn btn-primary mr-2">Register</button>
                    <button type="button" id="btnReset" onClick={reset} className="col-sm-2 btn btn btn-primary mr-2">Reset</button>
                    <button type="button" id="btnBack" onClick={navigateTo} className="col-sm-2 btn btn btn-primary">Back</button>
                </div>
            </form>
        </div>
        );
}
export default NumberPlateRegistration