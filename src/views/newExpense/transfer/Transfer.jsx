import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import TransferForm from "../../../components/transfer/TransferForm";

const Transfer = () => {
  let accountsList = [
    {
      name: "Tarjeta de Credito",
      balance: 12000,
    },
    {
      name: "Cuenta Corriente",
      balance: 5000,
    },
  ];

  return (
    <div>
      <Navegation />
      <div className="panel">
        <div className="expense__title">
          <h1>Transferencia</h1>
        </div>
        <TransferForm accountsList={accountsList} />
      </div>
    </div>
  );
};

export default Transfer;
