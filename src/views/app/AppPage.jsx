import React from "react";
import PanelProfile from "../../components/app/PanelProfile";
import Navegation from "../../components/navegation/Navegation";

const AppPage = () => {
  const user = {
    name: "Eze",
  };

  const info = {
    saldo: 25000,
  };

  return (
    <div>
      <Navegation />
      <PanelProfile user={user} info={info} />
    </div>
  );
};

export default AppPage;
