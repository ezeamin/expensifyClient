import React from "react";
import "./settings.css";
import SettingItem from "./settingItem/SettingItem";
import ChangePasswordForm from "./changePasswordForm/ChangePasswordForm";
import ChangeDataForm from "./changeDataForm/ChangeDataForm";
import EraseDataNLogOut from "./eraseDataNLogOut/EraseDataNLogOut";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Settings = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const opciones = [
    {
      title: "Cambiar datos personales",
      link: "/app/settings/datos",
    },
    {
      title: "Cambiar contraseña",
      link: "/app/settings/password",
    },
    {
      title: "Log out",
      link: "/app/logout",
    },
    {
      title: "Resetear datos",
      link: "/app/settings/reset",
    },
  ];

  const navigate = useNavigate();

  let estilo = window.getComputedStyle(document.body);
  let successColor = estilo.getPropertyValue("--color-success");
  let dangerColor = estilo.getPropertyValue("--color-danger");

  const logout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Cerrarás tu sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: successColor,
      cancelButtonColor: dangerColor,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: "Adios",
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          await fetch("/api/logout",{
            method: "DELETE",
          });
          navigate("/");
        });
      }
    });
  };

  switch (selectedOption) {
    case 0:
      return (
        <div className="profile__resumen__box">
          <ChangeDataForm />
          <div className="text-center">
            <button
              onClick={() => setSelectedOption(null)}
              className="profile__backButton"
            >
              Volver
            </button>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="profile__resumen__box">
          <ChangePasswordForm />
        </div>
      );
    case 2:
      /*return (
        <div className="profile__resumen__box">
          <EraseDataNLogOut action="logout" />
        </div>
      );*/
      logout();
      break;
    case 3:
      return (
        <div className="profile__resumen__box">
          <EraseDataNLogOut action="erase" />
        </div>
      );
    default:
      break;
  }

  return (
    <div className="profile__resumen__box">
      {opciones.map((opcion, index) => {
        return (
          <SettingItem
            key={index}
            index={index}
            title={opcion.title}
            link={opcion.link}
            onclick={setSelectedOption}
          />
        );
      })}
    </div>
  );
};

export default Settings;
