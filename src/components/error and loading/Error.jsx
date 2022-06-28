import { Button } from "@mui/material";
import React from "react";
import { init, send } from "@emailjs/browser";
import { LoadingButton } from "@mui/lab";
import { deleteDirectLogout } from "../../api/fetchingFunctions";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Error = (props) => {
  let url = window.location.href;
  let urlSplit = url.split("/");
  let site = urlSplit[urlSplit.length - 1];
  site = site[0]?.toUpperCase() + site?.slice(1);

  if(site.length <= 0 || site === "undefined") site = "Inicio";

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("Reportar error");
  const [disabled, setDisabled] = React.useState(false);

  const sendMail = () => {
    setLoading(true);
    init("kXceS724E8xWo8ddP");

    let templateParams = {
      message: JSON.stringify(props.data),
      site: url,
    };

    try {
      send("service_vdduh7c", "template_lt27yk9", templateParams).then(
        (response) => {
          setLoading(false);
          setMessage("Enviado");
          setDisabled(true);
        },
        (error) => {
          setLoading(false);
          setMessage("Error");
          setDisabled(true);
        }
      );
    } catch (e) {
      setLoading(false);
      setMessage("Error");
      setDisabled(true);
    }
  };

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      props.data.data.message === "Forbidden" ||
      props.data.data === "Forbidden"
    ) {
      deleteDirectLogout(setAuth, navigate);
    }
  }, [props?.data?.data]);

  return (
    <div className="errorPage text-light text-center container">
      <h1 className="fw-bold text-light">💀 Error</h1>
      <p>Estas en bancarrota!!1!</p>
      <p className="mt-3">No mentira, mira:</p>
      <div className="errorPage__errorCode">
        <p className="my-0">
          ✨{" "}
          {props?.data?.data?.message ? props.data.data.message : props.data.data}{" "}
          ✨<br /> <span className="errorPage__siteSpan">Site: {site}</span>
        </p>
      </div>
      <h2 className="mt-5">¿Y diai?</h2>
      <p className="mb-0">
        Te recomiendo recargar la pagina. Si no se soluciona, volvé a iniciar
        sesión. Sino, por favor esperá. Si aún no se soluciona, tomate un té. Si
        todavia nada, recien entonces tocá el boton :)
      </p>
      <div className="mt-2 w-75">
        {!loading ? (
          <div className={disabled && "forms__loadingButton"}>
            <Button
              variant="outlined"
              color="dangerColor"
              onClick={() => sendMail()}
              disabled={disabled}
              fullWidth
              style={{ fontWeight: "600" }}
            >
              {message}
            </Button>
          </div>
        ) : (
          <div className="forms__loadingButton">
            <LoadingButton
              loading
              loadingPosition="start"
              variant="outlined"
              color="dangerColor"
              backgroundColor="dangerColor"
              fullWidth
              style={{ fontWeight: "600" }}
            >
              &nbsp;Reportar error
            </LoadingButton>
          </div>
        )}
      </div>
      <div className="errorPage__img">
        <img src="/img/error/nyan.gif" alt="nyan cat" />
      </div>
    </div>
  );
};

export default Error;
