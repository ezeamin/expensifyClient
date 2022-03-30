import React from "react";
import Navegation from "../../components/navegation/Navegation";
import PanelInfoList from "../../components/panelInfoList/PanelInfoList";

const infoList = () => {
  const ruta = window.location.pathname;
  const split = ruta.split("/");
  const data = split[split.length - 1];

  const typeStr = data.split("=")[0];

  const type = typeStr === "cat" ? "category" : "account";
  const id = data.split("=")[1];

  const info =
    type === "account"
      ? {
          title: "Efectivo",
          icon: "fa-solid fa-money-bill-1-wave",
          color: "#77dd77",
          accountType: "Efectivo",
          balance: 1000,
          spent: 9230,
          description: "Pepe",
          id: 1,
        }
      : {
          title: "Alimentos",
          icon: "fa-solid fa-utensils",
          color: "#f5c542",
          spent: 700,
          limit: 1000,
          description: "Pepe",
          id: 1,
        };

  return (
    <div>
      <Navegation />
      <PanelInfoList type={type} {...info} />
    </div>
  );
};

export default infoList;
