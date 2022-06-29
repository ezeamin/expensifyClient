import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import IncomeForm from "../../../components/income/IncomeForm";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteDirectLogout, getData, putData } from "../../../api/fetchingFunctions";
import Swal from "sweetalert2";
import Loading from "../../../components/error and loading/Loading";
import useRoundedBorder from "../../../hooks/useRoundedBorder";
import useAuth from "../../../hooks/useAuth";

const Income = (props) => {
  const [accountsList, setAccountsList] = React.useState([]);
  const [loadingPost, setLoadingPost] = React.useState(false);
  const [info, setInfo] = React.useState(null);

  const navigate = useNavigate();
  const auth = useAuth();

  const rounded = useRoundedBorder(); //for style

  const url = window.location.href;
  const urlSplit = url.split("/");
  const id = urlSplit[urlSplit.length - 1];

  const { isLoading } = useQuery(["accounts"], () => getData("/api/accounts"), {
    onSuccess: (data) => {
      if (data.status === 200) {
        setAccountsList(data.data.accounts);
      } else if (data.status === 403) {
        deleteDirectLogout(auth.setAuth, navigate);
      }
    },
  });

  const { isLoading: isLoadingData, isFetching: isFetchingData } = useQuery(
    ["info"],
    () => {
      if (props.edit) {
        return getData(`/api/income/${id}`);
      }
    },
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setInfo(data?.data);
        }
      },
    }
  );

  const { mutate } = useMutation((info) => putData("/api/income", info), {
    onSuccess: (data) => {
      setLoadingPost(false);
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
      setLoadingPost(false);
      let msg = data.text();
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });
    },
  });

  const { mutate: mutateEdit } = useMutation((info) => putData(`/api/income/${id}`, info), {
    onSuccess: (data) => {
      setLoadingPost(false);
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al editar el ingreso",
        });
      } else {
        Swal.fire({
          title: "Exito",
          text: "Ingreso editado",
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

  const newIncome = async (info) => {
    mutate(info);
  };

  const editIncome = async (info) => {
    mutateEdit(info);
  };

  if (isLoading || isLoadingData || isFetchingData)
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
        <IncomeForm
          isNew={!props.edit}
          accountsList={accountsList}
          newIncome={newIncome}
          loading={loadingPost}
          setLoadingPost={setLoadingPost}
          rounded={rounded}
          data={info}
          editIncome={editIncome}
        />
      </div>
    </div>
  );
};

export default Income;
