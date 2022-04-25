import React from "react";
import Navegation from "../../../components/navegation/Navegation";
import CategoryForm from "../../../components/categories/categoryForm/CategoryForm";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { putData } from "../../../api/fetchingFunctions";
import { icons } from "../../../data/accountIcons";
import { accountList } from "../../../data/accountList";
import useRoundedBorder from "../../../hooks/useRoundedBorder";

const NewAccount = (props) => {
  const navigate = useNavigate();
  const [loadingPost, setLoadingPost] = React.useState(false);

  const rounded = useRoundedBorder(); //for style

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

  const newAccount = async (info) => {
    mutate({
      title: info.title,
      icon: info.icon,
      balance: info.balance,
      accountType: info.accountType,
      description: info.description,
    });
  };

  return (
    <div>
      <Navegation />
      <div className="panel">
        <div className="expense__title mb-4">
          <h1>{props.name ? props.name : "Nueva cuenta"}</h1>
        </div>
        <CategoryForm
          accountList={accountList}
          isNew={true}
          type="account"
          defaultIcon={"fa-solid fa-money-bill-wave"}
          icons={icons}
          loading={loadingPost}
          setLoadingPost={setLoadingPost}
          newAccount={newAccount}
          rounded={rounded}
        />
      </div>
    </div>
  );
};

export default NewAccount;
