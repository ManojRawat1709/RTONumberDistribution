import React, { useEffect, useState } from 'react'
import DisplayData from './DisplayData'
import Confirmation from './Confirmation'
import Notification from './Notification'
import { useHistory } from "react-router-dom";

const RTONumberPlate = (props) => {

    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState([]);
    const [header, setHeader] = useState('');
    const [typeNotification, setTypeNotification] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [luckyData, setLuckyData] = useState([]);
    const [showTable, setShowtable] = useState(false);
    const [rtoData, setRtoData] = useState({ fistNumber: '', lastNumber: '', favNumber: '' });

    const history = useHistory();
    const navigateTo = () => history.push
        ({
            pathname: '/NumberPlateRegistration',
            state: {
                data: selectedNumber,
            },
        })

    const validation = (e) => {
        let isValid = true;
        if (rtoData.fistNumber === "" || !rtoData.fistNumber.match(/^\d{4}$/)) {
            setMessage(message => [...message, { a: "Please insert first number in 4 digit format" }]);
            isValid = false;
        }
        if (rtoData.lastNumber === "" || !rtoData.lastNumber.match(/^\d{4}$/)) {
            setMessage(message => [...message, { a: "Please insert last number in 4 digit format" }]);
            isValid = false;
        }
        if (rtoData.favNumber === "" || !rtoData.favNumber.match(/^\d{1}$/)) {
            setMessage(message => [...message, { a: "Please insert 1 digit favourite number" }]);
            isValid = false;
        }
        if (rtoData.fistNumber >= rtoData.lastNumber) {
            setMessage(message => [...message, { a: "Last number should not be greater than or equal to first number" }]);
            isValid = false;
        }
        if (rtoData.lastNumber - rtoData.fistNumber !== 2000) {
            setMessage(message => [...message, { a: "First number and last number range should be 2000" }]);
            isValid = false;
        }
        return isValid;
    }
    const onSearch = () => {
        const url = `NumberGenerator?firstNumber=${rtoData.fistNumber}&lastNumber=${rtoData.lastNumber}&favNumber=${rtoData.favNumber}`;
        fetch(url).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response;
        }).
            then(data => {
                setHeader("Data received")
                setTypeNotification("success")
                setMessage(message => [...message, { a: "your lucky number are listed below !!" }]);
                setLuckyData(data);
                setShowtable(true);
            }).
            catch(error => {
                console.log(error);
                setMessage(message => [...message, { a: `error occured while retrieving record : ${error}` }]);
                setHeader("Error Occured")
                setTypeNotification("danger")
            })
    };
    const changeHandler = (e) => {
        setRtoData({ ...rtoData, [e.target.name]: e.target.value });
        console.log(rtoData);
    }
    const getLuckyNumber = (e) => {
        setMessage([]);
        e.preventDefault();
        if (!validation()) {
            setHeader("Error Occured")
            setTypeNotification("danger")
        }
        else {
            onSearch();
        }
        handleShowNotification();
    }
    const reset = () => {
        setRtoData({ fistNumber: '', lastNumber: '', favNumber: '' });
        setShowtable(false);
        handleCloseNotification();
    }
    const rowClicked = (number) => {
        setShowModal(true);
        setSelectedNumber(number);
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const handleCloseNotification = () => {
        setShowNotification(false);
    }
    const handleShowNotification = () => {
        setShowNotification(true);
    }
    return (
        <div>
            <form className="border border-light p-5" onSubmit={e => getLuckyNumber(e)}>
                {showNotification && <Notification show={showNotification} typeNotification={typeNotification} handleClose={handleCloseNotification} message={message}
                    heading={header} />}
                <div className="mb-3 row">
                    <label htmlFor="firstNumber" className="form-label col-sm-2">FirstNumber</label>
                    <input type="text" id="firstNumber" name="fistNumber" className="form-control col-sm-10" placeholder="Please enter first number of 2000 numbers range" value={rtoData.fistNumber} onChange={e => changeHandler(e)} />
                </div>
                <div className="form-group row">
                    <label htmlFor="lastNumber" className="form-label col-sm-2">LastNumber</label>
                    <input type="text" id="lastNumber" name="lastNumber" className="form-control col-sm-10" placeholder="Please enter last number of 2000 numbers range" value={rtoData.lastNumber} onChange={e => changeHandler(e)} />
                    </div>
                <div className="mb-3 row">
                    <label htmlFor="favNumber" className="form-label col-sm-2">FavNumber</label>
                    <input type="text" id="favNumber" name="favNumber" className="form-control col-sm-10" placeholder="Please enter your favourite number for calculating your lucky number" value={rtoData.favNumber} onChange={e => changeHandler(e)} />
                </div>
                <div className="text-center mt-4 mb-3">
                    <button type="submit" id="btnGetNumber" className="col-sm-2 btn btn btn-primary mr-2">GetLuckyNumber</button>
                    <button type="button" id="btnReset" onClick={reset} className="col-sm-2 btn btn btn-primary">Reset</button>
                </div>
                {showTable && <DisplayData numbers={luckyData} rowClicked={rowClicked} />}
                {showModal && <Confirmation show={showModal} handleClose={handleClose} numberPlate={selectedNumber} navigateTo={navigateTo}/>}
             </form>
       </div>
        );
}
export default RTONumberPlate