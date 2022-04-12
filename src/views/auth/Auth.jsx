import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import SignUp from "../../components/auth/signup/SignUp";
import useAuth from "../../hooks/useAuth";
import GithubCorner from "react-github-corner";
import "./auth.css";
import RecPassword from "../../components/auth/recPassword/RecPassword";

const Auth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [info, setInfo] = React.useState(null);

  const redirectSuccess = () => {
    navigate("/app");
  };

  React.useEffect(() => {
    if (info) {
      setAuth(info);
      redirectSuccess();
    }
  }, [info]);

  if (window.location.pathname === "/")
    return (
      <div className="auth">
        <GithubCorner
          octoColor="#2f2f2f"
          bannerColor="#fff"
          href="https://github.com/ezeamin/expensifyClient"
          target={"_blank"}
        />
        <div className="auth__logo">
          <img src="/img/favicon.png" alt="Expensify logo" />
        </div>
        <div className="auth__box">
          <h1 className="mb-0">Bienvenido</h1>
          <p className="my-0">Por favor, ingresa tus datos</p>
          <hr className="mt-1 text-dark" />
          <AuthForm redirectSuccess={redirectSuccess} setInfo={setInfo} />
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
  else if (window.location.pathname === "/signup")
    return (
      <div className="auth">
        <GithubCorner
          octoColor="#2f2f2f"
          bannerColor="#fff"
          href="https://github.com/ezeamin/expensifyClient"
          target={"_blank"}
        />
        <div className="auth__box">
          <h1 className="mb-0">Bienvenido</h1>
          <p className="my-0">Por favor, ingresa tus datos</p>
          <hr className="mt-1 text-dark" />
          <SignUp redirectSuccess={redirectSuccess} setInfo={setInfo} />
          <a href="/" className="auth__box__volver">
            <p className="mt-3 mb-0">Volver</p>
          </a>
        </div>
      </div>
    );
  return (
    <div className="auth">
      <GithubCorner
        octoColor="#2f2f2f"
        bannerColor="#fff"
        href="https://github.com/ezeamin/expensifyClient"
        target={"_blank"}
      />
      <div className="auth__box">
        <h1 className="mb-0">Recuperar contraseña</h1>
        <hr className="mt-1 text-dark" />
        <div>
          <p>Enviaremos un correo de recuperacion a la casilla que corresponda con tu DNI</p>
          <RecPassword />
        </div>
        <a href="/" className="auth__box__volver">
          <p className="mt-3 mb-0">Volver</p>
        </a>
      </div>
    </div>
  );
};

export default Auth;
