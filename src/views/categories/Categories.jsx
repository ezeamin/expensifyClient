import React from "react";
import PanelCategoriesNAccounts from "../../components/categories/PanelCategoriesNAccounts";
import Navegation from "../../components/navegation/Navegation";

const Categories = () => {
  const categories = [
    {
      title: "Alimentos",
      icon: "fa-solid fa-utensils",
      color: "#f5c542",
      spent: 700,
      limit: 1000,
      id: 1,
    },
    {
      title: "Ropa",
      icon: "fa-solid fa-tshirt",
      color: "#61b9d4",
      id: 2,
      spent: 200,
      limit: 1000,
    },
  ];

  return (
    <div>
      <Navegation />
      <PanelCategoriesNAccounts list={categories} type="category" link="/categories/new"/>
    </div>
  );
};

export default Categories;
