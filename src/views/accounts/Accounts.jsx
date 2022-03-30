import React from 'react';
import Navegation from '../../components/navegation/Navegation';
import PanelCategoriesNAccounts from '../../components/categories/PanelCategoriesNAccounts';

const Accounts = () => {
    const accounts = [
        {
          title: "Efectivo",
          icon: "fa-solid fa-money-bill-1-wave",
          color: "#77dd77",
          accountType: "Efectivo",
          id: 1,
        },
        {
          title: "Tarjeta VISA 6569",
          icon: "fa-brands fa-cc-visa",
          color: "#84b6f4",
          accountType: "Credito",
          id: 2,
        },
      ];
    
      return (
        <div>
          <Navegation />
          <PanelCategoriesNAccounts list={accounts} type="account" link="/accounts/new"/>
        </div>
      );
};

export default Accounts;