import { LinearProgress, Box } from "@mui/material";
import React from "react";
import "./resumen.css";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <p className="mb-0" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</p>
      </Box>
    </Box>
  );
}

const Resumen = () => {
  let cuentas = [
    {
      cuenta: "Cuenta 1",
      gastado: "100",
      promedio: "50",
    },
    {
      cuenta: "Cuenta 2",
      gastado: "200",
      promedio: "100",
    },
    {
      cuenta: "Cuenta 3",
      gastado: "300",
      promedio: "150",
    },
  ];

  return (
    <div className="text-light">
      <div className="profile__resumen__box">
        <h2 className="mb-0">Estado</h2>
        <div className="profile__resumen__detalle mb-3">
          <p className="mb-0">Limite mensual</p>
          <p className="mb-0 fw-bold">$ 0</p>
        </div>
        <LinearProgressWithLabel
          variant="determinate"
          value={50}
          color="success"
        />
      </div>
      <div className="profile__resumen__box mt-3">
        <div className="profile__resumen__detalle">
          <p className="mb-0">Gastado</p>
          <p className="mb-0 fw-bold">$ 0</p>
        </div>
        <div className="profile__resumen__items">
          {cuentas.map((cuenta, index) => {
            return (
              <div key={index} className="profile__resumen__detalle">
                <p className="mb-0">{cuenta.cuenta}</p>
                <p className="mb-0">xx %</p>
                <p className="mb-0">$ {cuenta.gastado}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="profile__resumen__box mt-3">
        <div className="profile__resumen__detalle">
          <p className="mb-0">Dias transcurridos</p>
          <p className="mb-0 fw-bold">0 / 31</p>
        </div>
        <div className="profile__resumen__detalle">
          <p className="mb-0">Promedio diario</p>
          <p className="mb-0 fw-bold">$ 0</p>
        </div>
        <div className="profile__resumen__items">
          {cuentas.map((cuenta, index) => {
            return (
              <div key={index} className="profile__resumen__detalle">
                <p className="mb-0">{cuenta.cuenta}</p>
                <p className="mb-0">xx %</p>
                <p className="mb-0">$ {cuenta.promedio}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resumen;
