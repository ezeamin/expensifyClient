import React from 'react';
import Navegation from '../../components/navegation/Navegation';
import './newExpense.css';

const NewExpense = () => {
    return (
        <div className='text-light'>
            <Navegation />
            <div className="newExpense__optionsBox">
                <div className="newExpense__optionsBox__group">
                    <div className="newExpense__optionsBox__button newExpense__optionsBox__button--ingreso">
                        <i className="fa-solid fa-arrow-up fa-2x"></i>
                    </div>
                    <p className='mb-0 mt-3 descripciones'>Ingreso</p>
                </div>
                <div className="newExpense__optionsBox__group">
                    <div className="newExpense__optionsBox__button newExpense__optionsBox__button--gasto">
                        <i className="fa-solid fa-arrow-down fa-2x"></i>
                    </div>
                    <p className='mb-0 mt-3 descripciones'>Gasto</p>
                </div>
            </div>
        </div>
    );
};

export default NewExpense;