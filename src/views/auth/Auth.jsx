import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import SignUp from "../../components/auth/signup/SignUp";
import "./auth.css";

const Auth = () => {
  const navigate = useNavigate();

  const redirectSuccess = () => {
    navigate("/app");
  };

  if (window.location.pathname === "/")
    return (
      <div className="auth">
        <div className="auth__logo">
          <img src="/img/favicon.png" alt="Expensify logo" />
        </div>
        <div className="auth__box">
          <h1 className="mb-0">Bienvenido</h1>
          <p className="my-0">Por favor, ingresa tus datos</p>
          <hr className="mt-1 text-dark" />
          <AuthForm redirectSuccess={redirectSuccess} />
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
  return (
    <div className="auth">
      <div className="auth__box">
        <h1 className="mb-0">Bienvenido</h1>
        <p className="my-0">Por favor, ingresa tus datos</p>
        <hr className="mt-1 text-dark" />
        <SignUp redirectSuccess={redirectSuccess} />
        <a href="/" className="auth__box__volver">
          <p className="mt-3 mb-0">Volver</p>
        </a>
      </div>
    </div>
  );
};

export default Auth;
