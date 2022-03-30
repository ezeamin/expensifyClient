import React from "react";
import IncomesTable from "./IncomesTable";
import getMonth from "../../../helpers/getMonth";

const PanelIncomesTable = () => {
  let [month, setMonth] = React.useState("");

  React.useEffect(() => {
    setMonth(getMonth(0));
  }, []);

  return (
    <div className="profile__resumen__box mt-3">
      <div className="text-start">
        <div className="lists__title__container">
          <div className="lists__title__container__colorCircle successBox"></div>
          <h2 className="fw-bold mb-0">Ingresos</h2>
        </div>
        <p className="mb-0">Periodo: {month}</p>
      </div>
      <IncomesTable />
    </div>
  );
};

export default PanelIncomesTable;
