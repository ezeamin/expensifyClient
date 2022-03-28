import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import "./auth.css";

const Auth = () => {
  const navigate = useNavigate();

  const redirectSuccess = () => {
    navigate("/app");
  };

  return (
    <div className="auth">
      <div className="auth__logo">
        <img src="/img/logo.png" alt="Expensify logo" />
      </div>
      <div className="auth__box">
        <h1 className="mb-0">Bienvenido</h1>
        <p className="my-0">Por favor, ingresa tus datos</p>
        <hr className="mt-1 text-dark" />
        <AuthForm redirectSuccess={redirectSuccess}/>
      </div>
      <div className="auth__box mt-2">
        <p className="mb-0 auth__box__mensajeRegistro">
          ¿Sos nuevo?{" "}
          <a href="/signup" className="auth__box__mensajeRegistro__a">
            Registrate acá
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
