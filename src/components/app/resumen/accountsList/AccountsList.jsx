import React from "react";
import AccountsListItem from "../accountsListItem/AccountsListItem";
import "./accountsList.css";

const AccountsList = (props) => {
  let total = props.accounts.length;

  return (
    <div className="profile__resumen__items">
      {props.accounts.map((cuenta, index) => {
        return (
          <React.Fragment key={index}>
            <AccountsListItem {...cuenta}/>
            {index !== total-1 && <hr className="my-1 hr__separateItems" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default AccountsList;
