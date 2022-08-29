import React from "react";
import IncomesTable from "./IncomesTable";
import getMonth from "../../../helpers/getMonth";
import { getData } from "../../../api/fetchingFunctions";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { Skeleton } from "@mui/material";

const PanelIncomesTable = () => {
  let [month, setMonth] = React.useState(<Skeleton sx={{width: 50,display: "inline-block"}}/>);

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

  const handleFilter = () => {
    Swal.fire({
      title: "Proximamente",
      text: "Esta funcionalidad estará disponible próximamente",
      icon: "info",
      timer: 2500,
      showConfirmButton: false,
    });
  }

  return (
    <div className="profile__resumen__box mt-3">
      <div className="d-flex justify-content-between">
        <div>
          <div className="lists__title__container">
            <div className="lists__title__container__colorCircle successBox"></div>
            <h2 className="fw-bold mb-0">Ingresos</h2>
          </div>
          <p className="mb-0">
            Periodo: <span className="fw-bold">{month}</span>
          </p>
        </div>
        {id ? (
          <Button
            variant="outline-secondary"
            className="fw-bold"
            onClick={() => navigate("/expenses")}
          >
            Volver a hoy
          </Button>
        ) : (
          <div className="filter__button" onClick={handleFilter}>
            <i className="fa-solid fa-filter"></i>
          </div>
        )}
      </div>
        <IncomesTable id={id || null} />
    </div>
  );
};

export default PanelIncomesTable;
