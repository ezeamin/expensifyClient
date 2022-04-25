import React from "react";

const AccountsListItem = (props) => {
  return (
    // <div className="profile__resumen__detalle">
    <div className="row">
      <p className="mb-0 col-6">{props.name}</p>
      <p className="mb-0 col-3 text-end">xx %</p>
      <p className="mb-0 col-3 text-end">$ {props.mean}</p>
    </div>
  );
};

export default AccountsListItem;
