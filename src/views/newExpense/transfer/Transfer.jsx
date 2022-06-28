import React from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getData, putData } from "../../../api/fetchingFunctions";
import Loading from "../../../components/error and loading/Loading";
import Navegation from "../../../components/navegation/Navegation";
import TransferForm from "../../../components/transfer/TransferForm";
import useRoundedBorder from "../../../hooks/useRoundedBorder";

const Transfer = () => {
  const [accountsList, setAccountsList] = React.useState([]);
  const [loadingPost, setLoadingPost] = React.useState(false);

  const navigate = useNavigate();
  
  const rounded = useRoundedBorder(); //for style

  const { isLoading } = useQuery(["accounts"], () => getData("/api/accounts"), {
    onSuccess: (data) => {
      if (data.status === 200) {
        setAccountsList(data.data.accounts);
      }
    },
  });

  const { mutate } = useMutation((info) => putData("/api/transfer", info), {
    onSuccess: (data) => {
      setLoadingPost(false);
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al efectuar la transferencia",
        });
      } else {
        Swal.fire({
          title: "Exito",
          text: "Transferencia efectuada",
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

  const newTransfer = async (info) => {
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
          <h1>Transferencia</h1>
        </div>
        <TransferForm
          accountsList={accountsList}
          newTransfer={newTransfer}
          setLoadingPost={setLoadingPost}
          loading={loadingPost}
          rounded={rounded}
        />
      </div>
    </div>
  );
};

export default Transfer;
