import React from "react";
import "./resumen.css";
import LinearProgressWithLabel from "../../../helpers/LinearProgressWithLabel";
import getMonth from "../../../helpers/getMonth";
import Loading from "../../error and loading/Loading";
import Dato from "./dato/Dato";
import Box from "./box/Box";
import AccountsList from "./accountsList/AccountsList";
import { getData, putData } from "../../../api/fetchingFunctions";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";

const Resumen = ({ balance }) => {
  const [stateValue, setStateValue] = React.useState(0);
  const [limit, setLimit] = React.useState(0);
  const [progressColor, setProgressColor] = React.useState("successColor");
  const [month, setMonth] = React.useState(0);
  const [spent, setSpent] = React.useState(0);
  const [accounts, setAccounts] = React.useState([]);
  const [dayMeanSpent, setDayMeanSpent] = React.useState(0);
  const [dayMeanAccounts, setDayMeanAccounts] = React.useState([]);
  const [left, setLeft] = React.useState(0);
  const [negativeBalance, setNegativeBalance] = React.useState(false);

  const dt = new Date();
  const currentDay = dt.getDate();
  const currentMonth = dt.getMonth();
  const currentYear = dt.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  React.useEffect(() => {
    if (stateValue >= 80) {
      setProgressColor("dangerColor");
    } else if (stateValue >= 70) {
      setProgressColor("warningColor");
    } else setProgressColor("successColor");
  }, [stateValue]);

  React.useEffect(() => {
    setMonth(getMonth(currentMonth));
  }, []);

  //cambio de limite
  const { mutate } = useMutation(
    (info) => putData("/api/account/generalLimit", info),
    {
      onSuccess: (data) => {
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al modificar limite",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Limite mensual modificado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        }
      },
      onError: (data) => {
        let msg = data.text();
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  // info sobre gastado
  const { isLoading: isLoadingGastado, isError: isErrorGastado } = useQuery(
    ["gastado"],
    () => getData("/api/accounts/spentAndList"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setSpent(data.data.spent);
          setAccounts(data.data.accountsList);

          const days = currentDay - 1;

          const means = data.data.accountsList.map((acc) => {
            const spent = Math.round(acc.spent / days || acc.spent);
            return {
              title: acc.title,
              spent,
              mean: acc.mean,
            };
          });

          const dayMeanSpent = Math.round(
            data.data.spent / days || data.data.spent
          );
          setDayMeanSpent(dayMeanSpent);
          setDayMeanAccounts(means);
        }
      },
    }
  );

  const { isLoading: isLoadingLimit, isError: isErrorLimit } = useQuery(
    ["limit"],
    () => getData("/api/accounts/limit"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setLimit(data.data.limit);
        }
      },
    }
  );

  React.useEffect(() => {
    if (limit && spent) {
      const value = Math.round((spent * 100) / limit);
      setStateValue(value);

      const remainingDays = daysInMonth - currentDay + 1;
      const remaining = Math.round(balance - remainingDays * dayMeanSpent);
      setLeft(remaining);
      if (remaining < 0) {
        setNegativeBalance(true);
      }
    }
  }, [limit, spent]);

  const handleChangeLimit = async () => {
    const { value: newLimit } = await Swal.fire({
      title: "Ingresá el nuevo limite",
      input: "number",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un valor";
        }
      },
    });

    if (newLimit) {
      mutate({
        limit: Number.parseInt(newLimit),
      });
    }
  };

  if (isLoadingGastado || isLoadingLimit) return <Loading little />;
  if (isErrorGastado || isErrorLimit)
    return (
      <Box>
        <h3 className="text-danger">Error en la solicitud</h3>
        <p className="mb-0">Por favor, volvé a intentar</p>
      </Box>
    );
  return (
    <div className="listContainer--main">
      <div className="text-light paddingBottom">
        <Box>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Estado</h2>
            <i
              className="fa-solid fa-pencil text-secondary"
              onClick={handleChangeLimit}
            ></i>
          </div>
          <Dato title="Limite mensual" data={`$ ${limit}`} className="mb-2" />
          <LinearProgressWithLabel
            variant="determinate"
            value={stateValue > 100 ? 100 : stateValue}
            color={progressColor}
          />
        </Box>
        <Box top>
          <Dato title="Periodo Actual" data={month} />
          <Dato
            title="Dias transcurridos"
            data={`${currentDay - 1} / ${daysInMonth}`}
          />
          <Dato
            title="Dias restantes"
            data={`${daysInMonth - currentDay + 1}`}
          />
        </Box>
        <Box top>
          <Dato title="Gastado" data={`$ ${spent}`} bold />
          <AccountsList accounts={accounts} />
        </Box>
        <Box top>
          <Dato title="Promedio diario" data={`$ ${dayMeanSpent}`} bold />
          <AccountsList accounts={dayMeanAccounts} />
        </Box>
        <Box top>
          <p className="mb-0 text-center">
            De continuar así, llegarás a fin de mes con{" "}
            <span className={`fw-bold ${negativeBalance && "text-danger"}`}>
              ${left}
            </span>
          </p>
        </Box>
      </div>
    </div>
  );
};

export default Resumen;
