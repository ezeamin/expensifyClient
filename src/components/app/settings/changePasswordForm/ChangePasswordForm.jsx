import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { putData } from "../../../../api/fetchingFunctions";
import useRoundedBorder from "../../../../hooks/useRoundedBorder";
import RecPasswordCode from "../../../auth/recPasswordCode/RecPasswordCode";
import Box from "../../resumen/box/Box";

const ChangePasswordForm = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(
    (newPass) => putData("/api/auth/recPasswordFromLoggedAccount", newPass),
    {
      onSuccess: (data) => {
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al cambiar la contraseña",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Contraseña actualizada",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
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

  const changePassword = (newPass) => {
    mutate(newPass);
  };

  const rounded = useRoundedBorder(); //for style

  return (
    <Box>
      <p>Por favor, ingresa tu nueva contraseña</p>
      <RecPasswordCode rounded={rounded} changePassword={changePassword} />
    </Box>
  );
};

export default ChangePasswordForm;
