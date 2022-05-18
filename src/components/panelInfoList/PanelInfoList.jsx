import React from "react";
import "./panelInfoList.css";
import LinearProgressWithLabel from "../../helpers/LinearProgressWithLabel";
import InfoHeaderIcons from "./infoHeaderIcons/InfoHeaderIcons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../api/fetchingFunctions";

const PanelInfoList = (props) => {
  let [stateValue, setStateValue] = React.useState(0);
  let [progressColor, setProgressColor] = React.useState("successColor");
  let [limitText, setLimitText] = React.useState(props.limit);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.limit)
      setStateValue(Math.round((props.spent * 100) / props.limit));
    else setLimitText("-");
  }, [props.balance, props.limit, props.spent]);

  React.useEffect(() => {
    if (props.limit) {
      if (stateValue >= 80) {
        setProgressColor("dangerColor");
      } else if (stateValue >= 70) {
        setProgressColor("warningColor");
      } else setProgressColor("successColor");
    }
  }, [stateValue, props.limit]);

  const deleteItem = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5263dd",
      cancelButtonColor: "#FF5A5F",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        const res = await deleteData(`/api/${props.type}/${props.id}`);

        if (res.status === 200) {
          Swal.fire({
            title: "Borrado",
            text: "Se ha borrado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            const route =
              props.type === "category " ? "/categories" : "/accounts";
            navigate(route);
          });
        } else {
          Swal.fire({
            title: "Error",
            text: res.data.message
              ? res.data.message
              : "Ha ocurrido un error inesperado",
            icon: "error",
          });
        }
      }
    });
  };

  const editItem = () => {
    if (props.type === "account") {
      navigate("/accounts/edit/" + props.id);
    } else if (props.type === "category") {
      navigate("/categories/edit/" + props.id);
    }
  };

  return (
    <div className="container panel">
      <InfoHeaderIcons {...props} editItem={editItem} deleteItem={deleteItem} />
      <div className="profile__resumen__box listItem__saldos">
        {props.type === "account" && props.accountType !== "Credito" && (
          <>
            <div className="listItem__saldos__box listItem__saldos__box--main">
              <h3 className="mb-0 fw-bold">$ {props.balance}</h3>
              <p className="mb-0">Disponible</p>
            </div>
            <p className="mb-0">/</p>
          </>
        )}
        <div className="listItem__saldos__box">
          <h3 className="mb-0 fw-bold">$ {props.spent}</h3>
          <p className="mb-0">Gastado</p>
        </div>
        {props.type === "category" ? (
          <div className="listItem__saldos__box">
            <h3 className="mb-0 fw-bold">$ {limitText}</h3>
            <p className="mb-0">Limite</p>
          </div>
        ) : null}
      </div>
      {props.type === "category" && props.limit ? (
        <div className="profile__resumen__box mt-2">
          <h3>Estado</h3>
          <div className="profile__resumen__detalle">
            <p className="mb-0">Limite</p>
            <p className="mb-0 fw-bold">$ {props.limit}</p>
          </div>
          <LinearProgressWithLabel
            variant="determinate"
            value={stateValue}
            color={progressColor}
          />
        </div>
      ) : null}
      <div className="profile__resumen__box mt-2">
        {props.type === "account" ? (
          <div className="profile__resumen__detalle mb-2">
            <p className="mb-0 fw-bold">Tipo</p>
            <p className="mb-0">{props.accountType}</p>
          </div>
        ) : null}
        <div>
          {props.type === "account" ? (
            <p className="mb-0 fw-bold">Notas</p>
          ) : (
            <h3>Notas</h3>
          )}
          <p className="mb-0">
            {props.description ? props.description : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelInfoList;
