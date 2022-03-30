import React from "react";
import { CircularProgress } from "@mui/material";

const CategoryItem = (props) => {
  let id;

  if(props.type === "category") id="cat="+props.id;
  else id="acc="+props.id;

  return (
    <a href={`/info/${id}`} className="categorias__box profile__resumen__box mb-2">
      <div className="categorias__box__leftGroup">
        <div
          className="categorias__box__leftGroup__icon"
          style={{ backgroundColor: props.color }}
        >
          {props.type==="category" ? <CircularProgress variant="determinate" color={"mainColor"} value={props.progress} size={50} className="categorias__box__leftGroup__icon__progress"/> : null}
          <i className={props.icon}></i>
        </div>
        <div>
          <p className="mb-0 fw-bold">{props.title}</p>
          {(props.accountType && (props.accountType!=="Efectivo" && props.accountType!=="Otro")) ? <p className="mb-0">{props.accountType}</p> : null}
        </div>
      </div>
      <i className="fa-solid fa-angle-right"></i>
    </a>
  );
};

export default CategoryItem;
