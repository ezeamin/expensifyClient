import { Button } from "@mui/material";
import React from "react";
import Title from "../titles/Title";
import CategoryItem from "./categoryItem/CategoryItem";
import "./panelCategories.css";
import { useNavigate } from "react-router-dom";

const PanelCategoriesNAccounts = (props) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Title text={props.type === "category" ? "Categorias" : "Cuentas"} />
      <Button
        variant="contained"
        color="mainColor"
        onClick={() => navigate(props.link)}
        className="mb-3"
        fullWidth
      >
        {props.type === "category" ? "Nueva categoria" : "Nueva cuenta"}
      </Button>
      {props.list.map((item, index) => {
        return (
          <CategoryItem
            key={index}
            title={item.title}
            icon={item.icon}
            color={item.color}
            accountType={item.accountType}
            type={props.type}
            id={item.id}
            progress={
              item.spent ? Math.round((item.spent * 100) / item.limit) : null
            }
          />
        );
      })}
    </div>
  );
};

export default PanelCategoriesNAccounts;
