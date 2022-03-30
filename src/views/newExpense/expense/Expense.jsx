import React from 'react';
import Navegation from "../../../components/navegation/Navegation";
import ExpenseForm from "../../../components/expense/ExpenseForm";

const Expense = () => {
    let categoriesList = [];
    let accountsList = [];

    return (
        <div>
            <Navegation disabled={false}/>
            <div className="panel">
            <div className="expense__title">
                <h1>Nuevo gasto</h1>
            </div>
            <ExpenseForm categoriesList={categoriesList} accountsList={accountsList}/>
            </div>
        </div>
    );
};

export default Expense;