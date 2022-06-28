import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { cargarPackCategorias } from "../../../api/fetchingFunctions";
import Empty from "../../error and loading/Empty";
import CategoryItem from "../categoryItem/CategoryItem";

let estilo = window.getComputedStyle(document.body);
let successColor = estilo.getPropertyValue("--color-success");

const CategoryAndAccountList = (props) => {
  const navigate = useNavigate();

  const cargarPack = () => {
    Swal.fire({
      title: "Cargar pack",
      text: "Se agregaran las siguientes categorias: Alimentos, Transporte, Entretenimiento, Salud, Educación, Auto, Gimnasia, Indumentaria, Supermercado, Kiosko, Servicios, Impuestos, Boludeces, Varios",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: successColor,
    }).then((result) => {
      if (result.value) {
        cargarPackCategorias();
        Swal.fire({
          title: "Cargando",
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
        });
        window.setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    });
  };

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
                limit={item.limit}
                progress={
                  item.spent && Math.round((item.spent * 100) / item.limit)
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
