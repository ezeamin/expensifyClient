import React from 'react';
import AccountsListItem from '../accountsListItem/AccountsListItem';

const AccountsList = (props) => {
    return (
        <div className="profile__resumen__items">
            {/*ORDENAR CUENTAS POR GASTO */}
            {props.accounts.map((cuenta, index) => {
              return <AccountsListItem {...cuenta} key={index} />;
            })}
          </div>
    );
};

export default AccountsList;