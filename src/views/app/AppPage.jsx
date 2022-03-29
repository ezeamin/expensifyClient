import React from "react";
import PanelProfile from "../../components/app/PanelProfile";
import Navegation from "../../components/navegation/Navegation";
import "./appPage.css";

const AppPage = () => {
  const user = {
    name: "Eze",
  };

  const info = {
    saldo: 5000,
  };

  return (
    <div>
      <Navegation />
      <PanelProfile user={user} info={info} />
    </div>
  );
};

export default AppPage;
