import React from 'react';
import Navegation from '../../../components/navegation/Navegation';
import IncomeForm from '../../../components/income/IncomeForm';

const Income = () => {
    let accountsList = [];

    return (
        <div>
            <Navegation />
            <div className="expense__title">
                <h1>Nuevo ingreso</h1>
            </div>
            <IncomeForm accountsList={accountsList}/>
        </div>
    );
};

export default Income;