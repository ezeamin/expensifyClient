import React from "react";
import PanelCategories from "../../components/categories/PanelCategories";
import Navegation from "../../components/navegation/Navegation";

const Categories = () => {
  const categories = [
    {
      title: "Alimentos",
      icon: "fa-solid fa-utensils",
      color: "#f5c542",
    },
    {
      title: "Ropa",
      icon: "fa-solid fa-tshirt",
      color: "#61b9d4",
    },
  ];

  return (
    <div>
      <Navegation />
      <PanelCategories categories={categories} />
    </div>
  );
};

export default Categories;
