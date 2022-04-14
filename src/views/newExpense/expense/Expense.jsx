import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import ExpenseForm from "../../../components/expense/ExpenseForm";
import { useMutation, useQuery } from "react-query";
import { getData, putData } from "../../../api/fetchingFunctions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/error and loading/Loading";

const Expense = () => {
  let [categoriesList, setCategoriesList] = React.useState([]);
  let [accountsList, setAccountsList] = React.useState([]);

  const navigate = useNavigate();

  const { isLoading: isLoadingCat } = useQuery(
    ["categories"],
    () => getData("/api/categories"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setCategoriesList(data.data.categories);
        }
      },
    }
  );

  const { isLoading: isLoadingAcc } = useQuery(
    ["accounts"],
    () => getData("/api/accounts"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setAccountsList(data.data.accounts);
        }
      },
    }
  );

  const { mutate } = useMutation((info) => putData("/api/expense", info), {
    onSuccess: (data) => {
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al agregar el gasto",
        });
      } else {
        Swal.fire({
          title: "Exito",
          text: "Gasto agregado",
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

  const newExpense = async (info) => {
    mutate(info);
  };

  if (isLoadingCat || isLoadingAcc)
    return (
      <div>
        <Navegation />
        <Loading />
      </div>
    );
  if (categoriesList.length === 0 || accountsList.length === 0) {
    <div>
      <Navegation />
      <div className="container w-100 d-flex justify-content-center">
        <h3 className="fw-bold">
          Carga tu primera categoria y/o cuenta antes de cargar un gasto!
        </h3>
      </div>
    </div>;
  }
  return (
    <div>
      <Navegation disabled={false} />
      <div className="panel">
        <div className="expense__title">
          <h1>Nuevo gasto</h1>
        </div>
        <ExpenseForm
          newExpense={newExpense}
          categoriesList={categoriesList}
          accountsList={accountsList}
          isNew={true}
        />
      </div>
    </div>
  );
};

export default Expense;
