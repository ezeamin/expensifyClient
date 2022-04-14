import React from "react";

const ItemList = (props) => {
  if (props.type === "category")
    return (
      <div>
        <div className="d-flex align-items-center">
          <i className={props.icon} style={{ color: props.color }}></i>
          <p className="mb-0 ms-3 fw-bold">{props.title}</p>
        </div>
      </div>
    );
  return (
    <div>
      <div className="d-flex align-items-center">
        <i className={props.icon} style={{ color: props.color }}></i>
        <div className="ms-3">
          <p className="mb-0 fw-bold">{props.title}</p>
          <p className="mb-0">$ {props.balance}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
