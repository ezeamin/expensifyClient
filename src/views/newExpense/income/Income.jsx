import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import IncomeForm from "../../../components/income/IncomeForm";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getData, putData } from "../../../api/fetchingFunctions";
import Swal from "sweetalert2";
import Loading from "../../../components/error and loading/Loading";

const Income = () => {
  let [accountsList, setAccountsList] = React.useState([]);

  const navigate = useNavigate();

  const {
    isLoading,
  } = useQuery(["accounts"], () => getData("/api/accounts"), {
    onSuccess: (data) => {
      if (data.status === 200) {
        setAccountsList(data.data.accounts);
      }
    },
  });

  const { mutate } = useMutation((info) => putData("/api/income",info), {
    onSuccess: (data) => {
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al agregar el ingreso",
        });
      } else {
        Swal.fire({
          title: "Exito",
          text: "Ingreso cargado",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/expenses");
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
  });

  const newIncome = async (info) => {
    mutate(info);
  };

  if (isLoading)
    return (
      <div>
        <Navegation />
        <Loading />
      </div>
    );
  return (
    <div>
      <Navegation />
      <div className="panel">
        <div className="expense__title">
          <h1>Nuevo ingreso</h1>
        </div>
        <IncomeForm isNew={true} accountsList={accountsList} newIncome={newIncome}/>
      </div>
    </div>
  );
};

export default Income;
