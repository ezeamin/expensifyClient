import React from "react";
import "./settings.css";
import SettingItem from "./settingItem/SettingItem";
import ChangePasswordForm from "./changePasswordForm/ChangePasswordForm";
import ChangeDataForm from "./changeDataForm/ChangeDataForm";
import EraseDataNLogOut from "./eraseDataNLogOut/EraseDataNLogOut";

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

  switch (selectedOption) {
    case 0:
      return (
        <div className="profile__resumen__box">
          <ChangeDataForm />
          <div className="text-center">
            <button onClick={() => setSelectedOption(null)} className="profile__backButton">Volver</button>
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
      return (
        <div className="profile__resumen__box">
          <EraseDataNLogOut action="logout" />
        </div>
      );
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
