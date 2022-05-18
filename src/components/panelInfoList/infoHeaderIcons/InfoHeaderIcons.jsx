import React from "react";

const InfoHeaderIcons = (props) => {
  return (
    <div className="infoList__top__group mb-4">
      <div className="infoList__top__group__icons">
        <button
          onClick={props.deleteItem}
          className="infoList__top__icon infoList__top__icon__actions dangerBox"
        >
          <i className="fa-solid fa-trash text-light"></i>
        </button>
        <div
          className="infoList__top__icon"
          style={{ backgroundColor: props.color }}
        >
          <i className={`${props.icon} fa-3x`}></i>
        </div>
        <button
          onClick={props.editItem}
          className="infoList__top__icon infoList__top__icon__actions warningBox"
        >
          <i className="fa-solid fa-pencil text-light"></i>
        </button>
      </div>
      <h1 className="text-light fw-bold">{props.title}</h1>
    </div>
  );
};

export default InfoHeaderIcons;
