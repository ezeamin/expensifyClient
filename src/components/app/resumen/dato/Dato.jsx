import React from "react";

const Dato = (props) => {
  return (
    <div className={"profile__resumen__detalle " + props.className}>
      <p className={props.bold ? "mb-0 fw-bold" : "mb-0"}>{props.title}</p>
      <p className="mb-0 fw-bold">{props.data}</p>
    </div>
  );
};

export default Dato;
