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
  else if (props.type === "account")
    return (
      <div>
        <div className="d-flex align-items-center">
          <i className={props.icon} style={{ color: props.color }}></i>
          <div className="ms-3">
            <p className="mb-0 fw-bold">{props.title}</p>
            {!props.noBalance ? (
              <p className="mb-0">$ {props.balance}</p>
            ) : (
              <p className="mb-0">{props.accountType}</p>
            )}
          </div>
        </div>
      </div>
    );
  else if (props.type === "debtor")
    return (
      <div>
        <div className="d-flex align-items-center">
          <p className="mb-0 ms-3 fw-bold">{props.name}</p>
        </div>
      </div>
    );
};

export default ItemList;
