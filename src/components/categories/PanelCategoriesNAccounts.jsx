import { Button } from "@mui/material";
import React from "react";
import Title from "../titles/Title";
import CategoryItem from "./categoryItem/CategoryItem";
import "./panelCategories.css";
import { useNavigate } from "react-router-dom";
import Empty from "../error and loading/Empty";

const PanelCategoriesNAccounts = (props) => {
  const navigate = useNavigate();
  const container = React.useRef();

  React.useEffect(() => {
    if(props.list.length >= 5){
      container.current.className = "container paddingBottom";
    }
    else if(props.list.length < 5){
      container.current.className = "container";
    }
  }, [props.list]);

  const name = props.type === "category" ? "categorias" : "cuentas";

  const cargarPack = () => {};

  return (
    <div className="container" ref={container}>
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
      {props.list.length !== 0 ? props.list.map((item, index) => {
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
      }) : <Empty name={name} cargarPack={cargarPack}/>}
    </div>
  );
};

export default PanelCategoriesNAccounts;
