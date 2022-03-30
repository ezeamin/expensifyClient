import React from "react";
import getMonth from "../../../helpers/getMonth";
import ExpensesTable from "./ExpensesTable";

const PanelExpensesTable = () => {
  let [month, setMonth] = React.useState("");

  React.useEffect(() => {
    setMonth(getMonth(0));
  }, []);

  return (
    <div className="profile__resumen__box">
      <div className="text-start">
        <div className="lists__title__container">
          <div className="lists__title__container__colorCircle dangerBox"></div>
          <h2 className="fw-bold mb-0">Gastos</h2>
        </div>
        <p className="mb-0">Periodo: {month}</p>
      </div>
      <ExpensesTable />
    </div>
  );
};

export default PanelExpensesTable;
