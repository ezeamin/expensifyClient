import React from 'react';
import Navegation from '../../../components/navegation/Navegation';
import CategoryForm from '../../../components/categories/categoryForm/CategoryForm';

const icons = [
    "fa-solid fa-money-bill-wave",
    "fa-regular fa-credit-card",
    "fa-brands fa-cc-visa",
    "fa-brands fa-cc-mastercard",
    "fa-brands fa-cc-paypal",
    "fa-brands fa-cc-discover",
    "fa-brands fa-cc-amex",
    "fa-brands fa-cc-stripe",
    "fa-brands fa-cc-jcb",
    "fa-brands fa-cc-diners-club",
    "fa-brands fa-cc-apple-pay",
    "fa-brands fa-bitcoin",
    "fa-solid fa-wallet",
    "fa-solid fa-circle-question",
  ];

  const accountList = [
    "Efectivo",
    "Credito",
    "Debito",
    "Billetera electronica",
    "Criptomoneda",
    "Otro",
  ];

const NewAccount = (props) => {
    return (
        <div>
            <Navegation />
            <div className="panel">
                <div className="expense__title mb-4">
                    <h1>{props.name ? props.name : "Nueva cuenta"}</h1>
                </div>
                <CategoryForm accountList={accountList} isNew={false} type="account" defaultIcon={"fa-solid fa-money-bill-wave"} icons={icons}/>
            </div>
        </div>
    );
};

export default NewAccount;