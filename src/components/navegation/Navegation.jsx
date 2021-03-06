import React from "react";
import NavItem from "./navItem/NavItem";
import "./navegation.css";
import { useNavigate } from "react-router-dom";

const Navegation = (props) => {
  const navigate = useNavigate();

  const opcionesNav = [
    {
      titulo: "Categorias",
      icono: "fa-solid fa-utensils",
      enlace: "/categories",
      active: window.location.pathname.includes("/cat"),
    },
    {
      titulo: "Cuentas",
      icono: "fa-brands fa-cc-visa",
      enlace: "/accounts",
      active: window.location.pathname.includes("/acc"),
    },
    {},
    {
      titulo: "Gastos",
      icono: "fa-solid fa-list",
      enlace: "/expenses",
      active: window.location.pathname.includes("/expenses"),
    },
    {
      titulo: "Resumen",
      icono: "fa-solid fa-user-astronaut",
      enlace: "/",
      active: window.location.pathname === "/",
    },
  ];

  return (
    <div className="navegation__box">
      {opcionesNav.map((opcion, index) => {
        return <NavItem key={index} {...opcion} />;
      })}
      {props.disabled ? (
        <div className="navegation__box__newButton">
          <div className="navegation__box__newButton__a">
            <div className="navegation__box__newButton__circle navegation__box__newButton__circle--disabled">
              <i className="fa-solid fa-plus fa-2x"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="navegation__box__newButton">
          <button onClick={()=>navigate("/newExpense")} className="navegation__box__newButton__button">
            <div className="navegation__box__newButton__circle">
              <i className="fa-solid fa-plus fa-2x"></i>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navegation;
