import { Button } from "@mui/material";
import React from "react";
import Title from "../titles/Title";
import CategoryItem from "./categoryItem/CategoryItem";
import "./panelCategories.css";
import { IconPicker } from 'react-fa-icon-picker'

const PanelCategories = (props) => {
  const nuevaCategoria = () => {};

  const [value, setValue] = useState("")

  return (
    <div className="container">
      <Title text="Categorias" />
      <Button variant="contained" color="mainColor" onClick={() => nuevaCategoria()} className="mb-3" fullWidth>
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
          <IconPicker value={value} onChange={(v) => setValue(v)} />

    </div>
  );
};

export default PanelCategories;
