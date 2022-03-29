import { Button } from "@mui/material";
import React from "react";
import Title from "../titles/Title";
import CategoryItem from "./categoryItem/CategoryItem";
import "./panelCategories.css";
import { useNavigate } from "react-router-dom";

const PanelCategories = (props) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Title text="Categorias" />
      <Button
        variant="contained"
        color="mainColor"
        onClick={() => navigate("/categories/new")}
        className="mb-3"
        fullWidth
      >
        Nueva categoria
      </Button>
      {props.categories.map((category, index) => {
        return (
          <CategoryItem
            title={category.title}
            icon={category.icon}
            color={category.color}
          />
        );
      })}
    </div>
  );
};

export default PanelCategories;
