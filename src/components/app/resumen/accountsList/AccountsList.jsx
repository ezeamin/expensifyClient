import React from "react";
import AccountsListItem from "../accountsListItem/AccountsListItem";
import "./accountsList.css";

const AccountsList = (props) => {
  let total = props.accounts.length;

  return (
    <div className="profile__resumen__items">
      {props.accounts.map((cuenta, index) => {
        return (
          <>
            <AccountsListItem {...cuenta} key={index} />
            {index !== total-1 && <hr className="my-1 hr__separateItems" />}
          </>
        );
      })}
    </div>
  );
};

export default AccountsList;
