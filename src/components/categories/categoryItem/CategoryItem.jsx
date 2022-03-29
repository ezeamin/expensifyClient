import React from "react";

const CategoryItem = (props) => {
  return (
    <a href={`categories/info/${props.id}`} className="categorias__box profile__resumen__box mb-2">
      <div className="categorias__box__leftGroup">
        <div
          className="categorias__box__leftGroup__icon"
          style={{ backgroundColor: props.color }}
        >
          <i className={props.icon}></i>
        </div>
        <p className="mb-0 fw-bold">{props.title}</p>
      </div>
      <i className="fa-solid fa-angle-right"></i>
    </a>
  );
};

export default CategoryItem;
