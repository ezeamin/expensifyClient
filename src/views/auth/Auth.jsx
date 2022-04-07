import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthForm from "../../components/auth/AuthForm";
import SignUp from "../../components/auth/signup/SignUp";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../api/fetchingFunctions";
import "./auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [info, setInfo] = React.useState(null);

  const redirectSuccess = () => {
    navigate("/app");
  };

  const login = async (body) => {
    const { data: res } = useFetch("login", body);

    if (res) {
      if (res.status === 200) {
        Swal.fire({
          title: "Bienvenido",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        }).then(() => {
          this.props.setInfo(res.data);
        });
      } else {
        let msg = res.data.message;

        if (msg === "Usuario ya autenticado") {
          Swal.fire({
            title: "Ya estás autenticado",
            timer: 1500,
            icon: "info",
            showCancelButton: false,
            showConfirmButton: false,
          }).then(() => {
            this.props.redirectSuccess();
          });
          return;
        }

        /*this.setState({
          loginError: {
            error: true,
            msg: msg,
          },
          loading: false,
        });*/
      }
    }
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
        <div className="auth__logo">
          <img src="/img/favicon.png" alt="Expensify logo" />
        </div>
        <div className="auth__box">
          <h1 className="mb-0">Bienvenido</h1>
          <p className="my-0">Por favor, ingresa tus datos</p>
          <hr className="mt-1 text-dark" />
          <AuthForm
            redirectSuccess={redirectSuccess}
            setInfo={setInfo}
            login={login}
          />
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
