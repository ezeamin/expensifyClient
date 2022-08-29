import React from "react";
import Swal from "sweetalert2";
import { getData } from "../../../api/fetchingFunctions";
import getMonth from "../../../helpers/getMonth";
import TransfersTable from "./TransfersTable";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const PanelTransfersTable = () => {
  let [month, setMonth] = React.useState("...");

  const params = useParams();
  const id = params?.id;

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchMonth = async () => {
      const res = await getData("/api/periods/monthNum/" + id);
      if (res.status !== 200) {
        Swal.fire({
          title: "Error",
          text: "Error leyendo los datos",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
        return;
      }
      setMonth(getMonth(false, res.data.month));
    };
    if (id) fetchMonth();
    else setMonth(getMonth(true));
  }, [id]);

  return (
    <div className="profile__resumen__box mt-3">
      <div className="d-flex justify-content-between">
        <div>
          <div className="lists__title__container">
            <div className="lists__title__container__colorCircle warningBox"></div>
            <h2 className="fw-bold mb-0">Transferencias</h2>
          </div>
          <p className="mb-0">
            Periodo: <span className="fw-bold">{month}</span>
          </p>
        </div>
        {id && (
          <Button
            variant="outline-secondary"
            className="fw-bold"
            onClick={() => navigate("/expenses")}
          >
            Volver a hoy
          </Button>
        )}
      </div>
        <TransfersTable id={id || null} />
    </div>
  );
};

export default PanelTransfersTable;
