import React from "react";
import "./panelInfoList.css";
import LinearProgressWithLabel from "../../helpers/LinearProgressWithLabel";
import InfoHeaderIcons from "./infoHeaderIcons/InfoHeaderIcons";

const PanelInfoList = (props) => {
  let [stateValue, setStateValue] = React.useState(0);
  let [progressColor, setProgressColor] = React.useState("successColor");

  React.useEffect(() => {
    if (props.limit)
      setStateValue(Math.round((props.spent * 100) / props.limit));
  }, [props.balance, props.limit]);

  React.useEffect(() => {
    if (props.limit) {
      if (stateValue >= 80) {
        setProgressColor("dangerColor");
      } else if (stateValue >= 70) {
        setProgressColor("warningColor");
      } else setProgressColor("successColor");
    }
  }, [stateValue]);

  return (
    <div className="container panel">
      <InfoHeaderIcons {...props} />
      <div className="profile__resumen__box listItem__saldos">
        {props.type === "account" ? (
          <>
            <div className="listItem__saldos__box listItem__saldos__box--main">
              <h3 className="mb-0 fw-bold">$ {props.balance}</h3>
              <p className="mb-0">Disponible</p>
            </div>
            <p className="mb-0">/</p>
          </>
        ) : null}
        <div className="listItem__saldos__box">
          <h3 className="mb-0 fw-bold">$ {props.spent}</h3>
          <p className="mb-0">Gastado</p>
        </div>
        {props.type === "category" ? (
          <div className="listItem__saldos__box">
            <h3 className="mb-0 fw-bold">$ {props.limit}</h3>
            <p className="mb-0">Limite</p>
          </div>
        ) : null}
      </div>
      {props.type === "category" ? (
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
