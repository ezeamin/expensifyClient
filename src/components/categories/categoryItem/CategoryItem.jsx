import React from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryItem = (props) => {
  let id;

  const navigate = useNavigate();

  if (props.type === "categories") id = "cat=" + props.id;
  else id = "acc=" + props.id;

  return (
    <button
      onClick={()=>navigate(`/info/${id}`)}
      className="categorias__box profile__resumen__box mb-2"
    >
      <div className="categorias__box__leftGroup">
        <div
          className="categorias__box__leftGroup__icon"
          style={{ backgroundColor: props.color }}
        >
          {(props.type === "categories" && props.limit !== 0) ? (
            <CircularProgress
              variant="determinate"
              color={props.progress <= 80 ? "mainColor" : "dangerColor"}
              value={props.progress}
              size={50}
              className="categorias__box__leftGroup__icon__progress"
            />
          ) : null}
          <i className={props.icon}></i>
        </div>
        <div>
          <p className="mb-0 fw-bold text-start">{props.title}</p>
          {props.accountType &&
          props.accountType !== "Efectivo" &&
          props.accountType !== "Otro" ? (
            <p className="mb-0 text-start">{props.accountType}</p>
          ) : null}
        </div>
      </div>
      <i className="fa-solid fa-angle-right"></i>
    </button>
  );
};

export default CategoryItem;
