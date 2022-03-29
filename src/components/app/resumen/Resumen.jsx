import { LinearProgress, Box } from "@mui/material";
import React from "react";
import "./resumen.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  let [stateValue, setStateValue] = React.useState(50);
  let [progressColor, setProgressColor] = React.useState("successColor");

  React.useEffect(() => {
    if (stateValue >= 80) {
      setProgressColor("dangerColor");
    } else if (stateValue >= 70) {
      setProgressColor("warningColor");
    } else setProgressColor("successColor");
  }, [stateValue]);

  return (
    <div className="text-light">
      <div className="profile__resumen__box">
        <h2 className="mb-0">Estado</h2>
        <div className="profile__resumen__detalle mb-3">
          <p className="mb-0">Limite mensual</p>
          <p className="mb-0 fw-bold">$ 0</p>
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
          <p className="mb-0">Dias transcurridos</p>
          <p className="mb-0 fw-bold">0 / 31</p>
        </div>
        <div className="profile__resumen__detalle">
          <p className="mb-0">Dias restantes</p>
          <p className="mb-0 fw-bold">0</p>
        </div>
      </div>
      <div className="profile__resumen__box mt-3">
        <div className="profile__resumen__detalle">
          <p className="mb-0">Gastado</p>
          <p className="mb-0 fw-bold">$ 0</p>
        </div>
        <div className="profile__resumen__items">
          {/*ORDENAR CUENTAS POR GASTO */}
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
