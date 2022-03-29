import React from 'react';
import Navegation from '../../../components/navegation/Navegation';
import TransferForm from '../../../components/transfer/TransferForm';

const Transfer = () => {
    let accountsList = [{
        name: "Tarjeta de Credito",
        saldo: 12000,
    },{
        name: "Cuenta Corriente",
        saldo: 5000,
    }];

    return (
        <div>
            <Navegation />
            <div className="expense__title">
                <h1>Transferencia</h1>
            </div>
            <TransferForm accountsList={accountsList}/>
        </div>
    );
};

export default Transfer;