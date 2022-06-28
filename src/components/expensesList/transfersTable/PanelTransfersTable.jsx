import React from "react";
import getMonth from "../../../helpers/getMonth";
import TransfersTable from "./TransfersTable";

const PanelTransfersTable = () => {
  let [month, setMonth] = React.useState("");

  React.useEffect(() => {
    setMonth(getMonth(true));
  }, []);

  return (
    <div className="profile__resumen__box mt-3">
      <div className="text-start">
        <div className="lists__title__container">
          <div className="lists__title__container__colorCircle warningBox"></div>
          <h2 className="fw-bold mb-0">Transferencias</h2>
        </div>
        <p className="mb-0">Periodo: {month}</p>
      </div>
      <TransfersTable />
    </div>
  );
};

export default PanelTransfersTable;
