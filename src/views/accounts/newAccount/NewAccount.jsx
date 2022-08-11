import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import CategoryForm from "../../../components/categories/categoryForm/CategoryForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getData, putData } from "../../../api/fetchingFunctions";
import { icons } from "../../../data/accountIcons";
import { accountList } from "../../../data/accountList";
import useRoundedBorder from "../../../hooks/useRoundedBorder";
import Loading from "../../../components/error and loading/Loading";
import BackButton from "../../../components/backButton/BackButton";

const NewAccount = (props) => {
  const navigate = useNavigate();
  const [loadingPost, setLoadingPost] = React.useState(false);
  const [info, setInfo] = React.useState(null);

  const rounded = useRoundedBorder(); //for style

  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];

  const { mutate } = useMutation((info) => putData("/api/account", info), {
    onSuccess: (data) => {
      setLoadingPost(false);
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al crear la cuenta",
        });
      } else {
        Swal.fire({
          title: "Exito",
          text: "Cuenta agregada, cuidala porfis",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          navigate("/accounts");
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

  const { mutate: edit } = useMutation(
    (info) => putData("/api/account/" + id, info),
    {
      onSuccess: (data) => {
        setLoadingPost(false);
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al editar la cuenta",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Cuenta editada",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          }).then(() => {
            navigate("/accounts");
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

  const newAccount = async (info) => {
    mutate({
      title: info.title,
      icon: info.icon,
      balance: info.balance,
      accountType: info.accountType,
      description: info.description,
    });
  };

  const editAccount = async (info) => {
    if (info.new.balance !== info.old.balance) {
      Swal.fire({
        title: "Atención",
        html: `Es altamente recomendable que <b>NO</b> cambies el balance de una cuenta directamente, sino realizando ingresos y gastos, ya que impactará negativamente en las estadísticas de la cuenta del mes.
        <br/><br/>¿Deseas continuar?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, continuar",
        cancelButtonText: "No, cancelar",
      }).then((result) => {
        if (result.value) {
          edit({
            id: props.id,
            new: info.new,
            old: info.old,
          });
        } else setLoadingPost(false);
      });
    }
  };

  const { isLoading } = useQuery(
    ["catData"],
    () => getData("/api/account/" + id),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setInfo(data.data);
        }
      },
    }
  );

  return (
    <>
      <div className="container">
        <BackButton />
      </div>
      <Navegation />
      <div className="panel">
        <div className="expense__title mb-4">
          <h1>{props.edit ? "Editar cuenta" : "Nueva cuenta"}</h1>
        </div>
        {props.edit && isLoading ? (
          <Loading little />
        ) : (
          <CategoryForm
            accountList={accountList}
            isNew={!props.edit}
            type="account"
            defaultIcon={info ? info.icon : "fa-solid fa-money-bill-wave"}
            icons={icons}
            loading={loadingPost}
            setLoadingPost={setLoadingPost}
            newAccount={newAccount}
            editAccount={editAccount}
            rounded={rounded}
            data={info}
          />
        )}
      </div>
    </>
  );
};

export default NewAccount;
