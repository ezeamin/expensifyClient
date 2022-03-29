import React from "react";
import NavItem from "./navItem/NavItem";
import "./navegation.css";

const Navegation = (props) => {
  const opcionesNav = [
    {
      titulo: "Categorias",
      icono: "fa-solid fa-utensils",
      enlace: "/categories",
      active: window.location.pathname === "/categories",
    },
    {
      titulo: "Cuentas",
      icono: "fa-brands fa-cc-visa",
      enlace: "/accounts",
      active: window.location.pathname.includes("/accounts"),
    },
    {},
    {
      titulo: "Gastos",
      icono: "fa-solid fa-money-bill-1-wave",
      enlace: "/expenses",
      active: window.location.pathname.includes("/expenses"),
    },
    {
      titulo: "Resumen",
      icono: "fa-solid fa-user-astronaut",
      enlace: "/app",
      active: window.location.pathname.includes("/app"),
    },
  ];

  return (
    <div className="navegation">
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
            <a href="/newExpense" className="navegation__box__newButton__a">
              <div className="navegation__box__newButton__circle">
                <i className="fa-solid fa-plus fa-2x"></i>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navegation;
