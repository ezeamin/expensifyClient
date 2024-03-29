import React from "react";
import Navegation from "../../components/navegation/Navegation";
import "./newExpense.css";
import { Link } from "react-router-dom";

const NewExpense = () => {
  return (
    <div className="text-light">
      <Navegation />
      <div className="newExpense__optionsBox">
        <div className="newExpense__optionsBox--top">
          <div className="newExpense__optionsBox__group">
            <Link
              to="/newExpense/income"
              className="newExpense__optionsBox__button newExpense__optionsBox__button--ingreso"
            >
              <i className="fa-solid fa-arrow-up fa-2x"></i>
            </Link>
            <p className="mb-0 mt-1 descripciones">Ingreso</p>
          </div>
          <div className="newExpense__optionsBox__group">
            <Link
              to="/newExpense/expense"
              className="newExpense__optionsBox__button newExpense__optionsBox__button--gasto"
            >
              <i className="fa-solid fa-arrow-down fa-2x"></i>
            </Link>
            <p className="mb-0 mt-1 descripciones">Gasto</p>
          </div>
        </div>
        <div className="newExpense__optionsBox__group mt-3">
          <Link
            to="/newExpense/transfer"
            className="newExpense__optionsBox__button newExpense__optionsBox__button--transferencia"
          >
            <i className="fa-solid fa-right-left fa-2x"></i>
          </Link>
          <p className="mb-0 mt-1 descripciones">Transferir</p>
        </div>
      </div>
    </div>
  );
};

export default NewExpense;
