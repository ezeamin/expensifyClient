import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import SignUp from "../../components/auth/signup/SignUp";
import useAuth from "../../hooks/useAuth";
import GithubCorner from "react-github-corner";
import "./auth.css";
import RecPassword from "../../components/auth/recPassword/RecPassword";
import { pingServer } from "../../api/fetchingFunctions";
import RecPasswordCode from "../../components/auth/recPasswordCode/RecPasswordCode";
import AuthTitle from "../../components/auth/authTitle/AuthTitle";

const Auth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [info, setInfo] = React.useState(null);

  const redirectSuccess = () => {
    navigate("/app");
  };

  React.useEffect(() => {
    pingServer();
  }, []);

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
          <AuthTitle title="Bienvenido" showDescription={true} />
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
          <AuthTitle title="Bienvenido" showDescription={true} />
          <SignUp redirectSuccess={redirectSuccess} setInfo={setInfo} />
          <a href="/" className="auth__box__volver">
            <p className="mt-3 mb-0">Volver</p>
          </a>
        </div>
      </div>
    );
  else if (window.location.pathname === "/recPassword")
    return (
      <div className="auth">
        <GithubCorner
          octoColor="#2f2f2f"
          bannerColor="#fff"
          href="https://github.com/ezeamin/expensifyClient"
          target={"_blank"}
        />
        <div className="auth__box">
          <AuthTitle title="Recuperar contraseña" showDescription={false} />
          <div>
            <p>
              Enviaremos un correo de recuperacion a la casilla que corresponda
              con tu DNI
            </p>
            <RecPassword />
          </div>
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
        <AuthTitle title="Recuperar contraseña" showDescription={false} />
        <div>
          <p>
            Por favor, ingresa tu nueva contraseña
          </p>
          <RecPasswordCode />
        </div>
      </div>
    </div>
  );
};

export default Auth;
