import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import SignUp from "../../components/auth/signup/SignUp";
import useAuth from "../../hooks/useAuth";
import GithubCorner from "react-github-corner";
import "./auth.css";
import RecPassword from "../../components/auth/recPassword/RecPassword";
import { getData, putData } from "../../api/fetchingFunctions";
import RecPasswordCode from "../../components/auth/recPasswordCode/RecPasswordCode";
import AuthTitle from "../../components/auth/authTitle/AuthTitle";
import useRoundedBorder from "../../hooks/useRoundedBorder";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { Button } from "@mui/material";

const Auth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [info, setInfo] = React.useState(null);
  const [isErrorRecCode, setIsErrorRecCode] = React.useState(false);

  const rounded = useRoundedBorder(); //for style

  const redirectSuccess = () => {
    navigate("/");
  };

  React.useEffect(() => {
    if (info) {
      setAuth(info);
      redirectSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const params = useParams();
  const recCode = params?.recCode;

  const { isLoading: isLoadingRecCode, isFetching: isFetchingRecCode } =
    useQuery(
      ["recCode"],
      () => {return recCode ? getData(`/api/auth/recPassword/${recCode}`) : null},
      {
        onSuccess: (data) => {
          if (!data?.status || data?.status !== 200) {
            setIsErrorRecCode(true);
          }  
        },
      }
    );

  const { mutate } = useMutation(
    (infoRecCode) => putData("/api/auth/recPassword", infoRecCode),
    {
      onSuccess: (data) => {
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al cambiar la contraseña",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Contraseña actualizada",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/");
          });
        }
      },
      onError: (data) => {
        let msg = data.text();
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  const changePassword = (infoRecCode) => {
    infoRecCode.recCode = recCode;
    mutate(infoRecCode);
  };

  if (window.location.pathname === "/auth/login")
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
          <AuthForm
            redirectSuccess={redirectSuccess}
            setInfo={setInfo}
            rounded={rounded}
          />
        </div>
        <div className="auth__box mt-2">
          <p className="mb-0 auth__box__mensajeRegistro">
            ¿Sos nuevo?{" "}
            <a href="/auth/signup" className="auth__box__mensajeRegistro__a">
              Registrate acá
            </a>
          </p>
        </div>
      </div>
    );
  else if (window.location.pathname === "/auth/signup")
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
          <SignUp
            redirectSuccess={redirectSuccess}
            setInfo={setInfo}
            rounded={rounded}
          />
          <a href="/auth/login" className="auth__box__volver">
            <p className="mt-3 mb-0">Volver</p>
          </a>
        </div>
      </div>
    );
  else if (window.location.pathname === "/auth/recPassword")
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
            <RecPassword rounded={rounded} />
          </div>
          <a href="/auth/login" className="auth__box__volver">
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
        {isLoadingRecCode || isFetchingRecCode ? (
          <p className="my-3">Cargando...</p>
        ) : isErrorRecCode ? (
          <>
            <p>
              Ocurrió un error con el codigo de recuperación. Por favor, volvé a
              intentarlo.
            </p>
            <Button fullWidth variant="contained" color="primary" onClick={redirectSuccess}>
              Volver a inicio
            </Button>
          </>
        ) : (
          <>
            <p>Por favor, ingresa tu nueva contraseña</p>
            <RecPasswordCode
              rounded={rounded}
              changePassword={changePassword}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
