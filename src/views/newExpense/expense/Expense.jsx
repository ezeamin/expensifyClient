import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import ExpenseForm from "../../../components/expense/ExpenseForm";
import { useMutation, useQuery } from "react-query";
import {
  deleteDirectLogout,
  getData,
  putData,
} from "../../../api/fetchingFunctions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/error and loading/Loading";
import useRoundedBorder from "../../../hooks/useRoundedBorder";
import useAuth from "../../../hooks/useAuth";
import BackButton from "../../../components/backButton/BackButton";

const Expense = (props) => {
  const [categoriesList, setCategoriesList] = React.useState([]);
  const [accountsList, setAccountsList] = React.useState([]);
  const [loadingPost, setLoadingPost] = React.useState(false);
  const [info, setInfo] = React.useState(null);

  const rounded = useRoundedBorder(); //for style

  const navigate = useNavigate();
  const auth = useAuth();

  const url = window.location.href;
  const urlSplit = url.split("/");
  const id = urlSplit[urlSplit.length - 1];

  const { isLoading: isLoadingCat } = useQuery(
    ["categories"],
    () => getData("/api/categories"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setCategoriesList(data.data.categories);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
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

  const { isLoading: isLoadingData, isFetching: isFetchingData } = useQuery(
    ["info"],
    () => {
      if (props.edit) {
        return getData(`/api/expense/${id}`);
      }
    },
    {
      onSuccess: (data) => {
        if (props.edit && data.status === 200) {
          setInfo(data?.data);
        }
      },
    }
  );

  const { mutate } = useMutation((info) => putData("/api/expense", info), {
    onSuccess: (data) => {
      setLoadingPost(false);
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
      setLoadingPost(false);
      let msg = data.text();
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });
    },
  });

  const { mutate: mutateEdit } = useMutation(
    (info) => putData(`/api/expense/${id}`, info),
    {
      onSuccess: (data) => {
        setLoadingPost(false);
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al editar el gasto",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Gasto editado",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/expenses");
          });
        }
      },
      onError: (data) => {
        setLoadingPost(false);
        let msg = data.text();
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  const newExpense = async (info) => {
    mutate(info);
  };

  const editExpense = async (info) => {
    mutateEdit(info);
  };

  // This useEffect allows to avoid center content in this page
  React.useLayoutEffect(() => {
    if (isLoadingCat || isLoadingAcc || isLoadingData || isFetchingData) return;
    document.getElementsByClassName("panel")[0].style =
      "display: block; height: 100%";

    return () => {
      document.getElementsByClassName("panel")[0].style = "";
    };
  }, [isLoadingCat, isLoadingAcc, isLoadingData, isFetchingData]);

  if (isLoadingCat || isLoadingAcc || isLoadingData || isFetchingData)
    return (
      <div>
        <Navegation />
        <div className="panel">
          <Loading />
        </div>
      </div>
    );
  if (categoriesList.length === 0 || accountsList.length === 0) {
    <div>
      <Navegation />
      <div className="panel"></div>
      <div className="container w-100 d-flex justify-content-center">
        <h3 className="fw-bold">
          Carga tu primera categoria y/o cuenta antes de cargar un gasto!
        </h3>
      </div>
    </div>;
  }
  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <Navegation disabled={false} />
      <div className="panel">
        <div className="expense__title" style={{ marginTop: "5rem" }}>
          <h1>{props.edit ? "Editar gasto" : "Nuevo gasto"}</h1>
        </div>
        <ExpenseForm
          newExpense={newExpense}
          categoriesList={categoriesList}
          accountsList={accountsList}
          isNew={!props.edit}
          loading={loadingPost}
          setLoadingPost={setLoadingPost}
          rounded={rounded}
          data={info}
          editExpense={editExpense}
        />
      </div>
    </>
  );
};

export default Expense;
