import React from "react";
import "./resumen.css";
import LinearProgressWithLabel from "../../../helpers/LinearProgressWithLabel";
import getMonth from "../../../helpers/getMonth";
import Dato from "./dato/Dato";
import AccountsListItem from "./accountsListItem/AccountsListItem";
import Box from "./box/Box";
import AccountsList from "./accountsList/AccountsList";

const Resumen = () => {
  let cuentas = [
    {
      name: "Mercado Pago",
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

  const [stateValue, setStateValue] = React.useState(70);
  const [progressColor, setProgressColor] = React.useState("successColor");
  const [month, setMonth] = React.useState(0);

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
    <div className="listContainer--main">
      <div className="text-light paddingBottom">
        <Box>
          <h2 className="mb-0">Estado</h2>
          <Dato title="Limite mensual" data="$ xxxxx" className="mb-2" />
          <LinearProgressWithLabel
            variant="determinate"
            value={stateValue}
            color={progressColor}
          />
        </Box>
        <Box top>
          <Dato title="Periodo Actual" data={month} />
          <Dato title="Dias transcurridos" data="xx / xx" />
          <Dato title="Dias restantes" data="xx" />
        </Box>
        <Box top>
          <Dato title="Gastado" data="$ xxxx" bold />
          <AccountsList accounts={cuentas} />
        </Box>
        <Box top>
          <Dato title="Promedio diario" data="$ xxxx" bold />
          <AccountsList accounts={cuentas} />
        </Box>
      </div>
    </div>
  );
};

export default Resumen;
