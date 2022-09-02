import React from 'react';
import PanelExpensesList from '../../components/expensesList/PanelExpensesList';
import Navegation from '../../components/navegation/Navegation';

const Expenses = () => {
    return (
        <>
            <Navegation />
            <PanelExpensesList />
        </>
    );
};

export default Expenses;