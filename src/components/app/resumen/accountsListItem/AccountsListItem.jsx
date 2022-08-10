import React from "react";

const AccountsListItem = (props) => {
  return (
    // <div className="profile__resumen__detalle">
    <div className="row">
      <p className="mb-0 col-4">{props.title}</p>
      <p className="mb-0 col-3 text-end">{props.mean} %</p>
      <p className="mb-0 col-5 text-end">$ {props.spent}</p>
    </div>
  );
};

export default AccountsListItem;
