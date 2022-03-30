import React from "react";
import "./resumen.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgressWithLabel from "../../../helpers/LinearProgressWithLabel";
import getMonth from "../../../helpers/getMonth";

let estilo = window.getComputedStyle(document.body);
let warningColor = estilo.getPropertyValue("--color-warning");
let successColor = estilo.getPropertyValue("--color-success");
let dangerColor = estilo.getPropertyValue("--color-danger");

const theme = createTheme({
  palette: {
    successColor: {
      main: successColor,
    },
    warningColor: {
      main: warningColor,
    },
    dangerColor: {
      main: dangerColor,
    },
  },
});

const Resumen = () => {
  let cuentas = [
    {
      name: "Cuenta 1",
      spent: "xx",
      mean: "xx",
    },
    {
      name: "Cuenta 2",
      spent: "xx",
      mean: "xx",
    },
    {
      name: "Cuenta 3",
      spent: "xx",
      mean: "xx",
    },
  ];

  let [stateValue, setStateValue] = React.useState(50);
  let [progressColor, setProgressColor] = React.useState("successColor");
  let [month, setMonth] = React.useState("");

  React.useEffect(() => {
    if (stateValue >= 80) {
      setProgressColor("dangerColor");
    } else if (stateValue >= 70) {
      setProgressColor("warningColor");
    } else setProgressColor("successColor");
  }, [stateValue]);

  React.useEffect(() => {
    setMonth(getMonth(0));
  }, []);

  return (
    <div className="text-light">
      <div className="profile__resumen__box">
        <h2 className="mb-0">Estado</h2>
        <div className="profile__resumen__detalle mb-3">
          <p className="mb-0">Limite mensual</p>
          <p className="mb-0">$ xxxx</p>
        </div>
        <ThemeProvider theme={theme}>
          <LinearProgressWithLabel
            variant="determinate"
            value={stateValue}
            color={progressColor}
          />
        </ThemeProvider>
      </div>
      <div className="profile__resumen__box mt-3">
        <div className="profile__resumen__detalle">
          <p className="mb-0">Periodo actual</p>
          <p className="mb-0 fw-bold">{month}</p>
        </div>
        <div className="profile__resumen__detalle">
          <p className="mb-0">Dias transcurridos</p>
          <p className="mb-0 fw-bold">xx / xx</p>
        </div>
        <div className="profile__resumen__detalle">
          <p className="mb-0">Dias restantes</p>
          <p className="mb-0 fw-bold">xx</p>
        </div>
      </div>
      <div className="profile__resumen__box mt-3">
        <div className="profile__resumen__detalle">
          <p className="mb-0 fw-bold">Gastado</p>
          <p className="mb-0 fw-bold">$ xxxx</p>
        </div>
        <div className="profile__resumen__items">
          {/*ORDENAR CUENTAS POR GASTO */}
          {cuentas.map((cuenta, index) => {
            return (
              <div key={index} className="profile__resumen__detalle">
                <p className="mb-0">{cuenta.name}</p>
                <p className="mb-0">xx %</p>
                <p className="mb-0">$ {cuenta.spent}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="profile__resumen__box mt-3">
        <div className="profile__resumen__detalle">
          <p className="mb-0 fw-bold">Promedio diario</p>
          <p className="mb-0 fw-bold">$ 0</p>
        </div>
        <div className="profile__resumen__items">
          {cuentas.map((cuenta, index) => {
            return (
              <div key={index} className="profile__resumen__detalle">
                <p className="mb-0">{cuenta.name}</p>
                <p className="mb-0">xx %</p>
                <p className="mb-0">$ {cuenta.mean}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Resumen;
