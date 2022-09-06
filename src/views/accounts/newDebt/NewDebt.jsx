import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import DebtsForm from "../../../components/accounts/debtsForm/DebtsForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getData, putData } from "../../../api/fetchingFunctions";
import Loading from "../../../components/error and loading/Loading";
import BackButton from "../../../components/backButton/BackButton";

const NewDebt = (props) => {
  const [loadingPost, setLoadingPost] = React.useState(false);
  const [info, setInfo] = React.useState(null);

  const [accountsList, setAccountsList] = React.useState([]);
  const [debtorsList, setDebtorsList] = React.useState([]);

  const routerState = props?.location?.state;
  const edit = routerState?.edit;

  // const url = window.location.href;
  // const id = url.split("/")[url.split("/").length - 1];

  // const { mutate: edit } = useMutation(
  //   (info) => putData(`/api/debts/${props.type}/${data?.personId}/${data?.debtId}`, info),
  //   {
  //     onSuccess: (data) => {
  //       setLoadingPost(false);
  //       if (!data || data.status !== 200) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: data.data.message
  //             ? data.data.message
  //             : "Error al editar la deuda",
  //         });
  //       } else {
  //         Swal.fire({
  //           title: "Exito",
  //           text: "Deuda editada",
  //           icon: "success",
  //           showConfirmButton: false,
  //           timer: 2500,
  //         }).then(() => {
  //           navigate("/accounts");
  //         });
  //       }
  //     },
  //     onError: (data) => {
  //       setLoadingPost(false);
  //       let msg = data.text();
  //       Swal.fire({
  //         title: "Error",
  //         text: msg,
  //         icon: "error",
  //       });
  //     },
  //   }
  // );

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
          // edit({
          //   id: props.id,
          //   new: info.new,
          //   old: info.old,
          // });
        } else setLoadingPost(false);
      });
    }
  };

  useQuery(["accounts"], () => getData("/api/accounts"), {
    onSuccess: (data) => {
      if (data.status === 200) {
        setAccountsList(data.data.accounts);
      }
    },
  });

  const { refetch: refetchDebtors } = useQuery(
    ["debtors"],
    () => getData(`/api/debts/debtorsList/${props.type}`),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          //add item at start of array
          data.data.unshift({
            id: "new",
            name: "Nuevo deudor",
            icon: "fas fa-plus",
          });
          setDebtorsList(data.data);
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
        <div className="expense__title mb-1">
          <h1>{props.edit ? "Editar deuda" : "Nueva deuda"}</h1>
        </div>
        {props.edit &&
        {
          /*isLoading*/
        } ? (
          <Loading little />
        ) : (
          <DebtsForm
            isNew={!props.edit}
            type={props.type}
            accountsList={accountsList}
            debtorsList={debtorsList}
            refetchDebtors={refetchDebtors}
            loading={loadingPost}
            setLoadingPost={setLoadingPost}
            editDebt={editAccount}
            data={info}
          />
        )}
      </div>
    </>
  );
};

export default NewDebt;
