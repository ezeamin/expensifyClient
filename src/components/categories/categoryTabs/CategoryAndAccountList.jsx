import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../error and loading/Empty";
import CategoryItem from "../categoryItem/CategoryItem";

const CategoryAndAccountList = (props) => {
  const navigate = useNavigate();

  const cargarPack = () => {};

  return (
    <div>
      <Button
        variant="contained"
        color="mainColor"
        onClick={() => navigate(props.data.link)}
        className="mb-3"
        fullWidth
      >
        {props.type === "categories" ? "Nueva categoría" : "Nueva cuenta"}
      </Button>
      <div className="listContainer">
        {props.data.list.length !== 0 ? (
          props.data.list.map((item, index) => {
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
                  item.spent
                    ? Math.round((item.spent * 100) / item.limit)
                    : null
                }
              />
            );
          })
        ) : (
          <Empty
            name={props.type === "categories" ? "categorias" : "cuentas"}
            cargarPack={cargarPack}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryAndAccountList;
