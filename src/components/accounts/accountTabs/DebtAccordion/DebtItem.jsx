import React from 'react';
import "./debtItem.css"

const DebtItem = (props) => {
    const {debt} = props;

    const handleInfo = () => {}

    const handlePay = () => {}

    const handleDelete = () => {}

    return (
        <div className='debtItem-container'>
            <div>
                <p className='mb-0'>Titulo</p>
                <p className='mb-0'>desde <span className='fw-bold'>CUENTA</span></p>
                <p className='mb-0'>$ 123.45</p>
            </div>
            <div className='d-flex'>
                <div className='debtItem-button' onClick={handleInfo}>
                    <i className="fa-solid fa-info text-info"></i>
                </div>
                <div className='debtItem-button' onClick={handlePay}>
                    <i className="fa-solid fa-dollar-sign text-success"></i>
                </div>
                <div className='debtItem-button' onClick={handleDelete}>
                    <i className="fa-solid fa-trash text-danger"></i>
                </div>
            </div>
        </div>
    );
};

export default DebtItem;