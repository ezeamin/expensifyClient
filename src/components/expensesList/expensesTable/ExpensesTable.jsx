import { Button } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteData,
  deleteDirectLogout,
  getData,
} from "../../../api/fetchingFunctions";
import useAuth from "../../../hooks/useAuth";
import EmptyMsg from "../emptyMsg/EmptyMsg";
import ErrorMsg from "../errorMsg/ErrorMsg";
import LoadingList from "../loadingList/LoadingList";

const ExpensesTable = (props) => {
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const auth = useAuth();

  const { id } = props;
  const link = id ? `/api/expenses/listTransform/${id}` : "/api/expenses/listTransform"

  const { isLoading, isFetching } = useQuery(
    ["expenses"],
    () => getData(link),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setRows(data.data);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
        } else {
          setError(true);
          setErrorMsg(data.data.message ? data.data.message : data.data);
        }
      },
    }
  );

  const navigate = useNavigate();

  const handleEdit = (id) => {
    const expense = rows.find((expense) => expense.id === id);
    if (expense.category === "DELETED") {
      Swal.fire({
        title: "Error",
        text: "La categoria ha sido eliminada, y no se puede modificar",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }
    if (expense.account === "DELETED") {
      Swal.fire({
        title: "Error",
        text: "La cuenta ha sido eliminada, y no se puede modificar",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    navigate(`/newExpense/expense/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5263dd",
      cancelButtonColor: "#FF5A5F",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.value) {
        const res = await deleteData(`/api/expense/${id}`);

        if (res.status === 200) {
          Swal.fire({
            title: "Borrado",
            text: "Se ha eliminado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error",
            text: res.data.message
              ? res.data.message
              : "Ha ocurrido un error inesperado",
            icon: "error",
          });
        }
      }
    });
  };

  if (error && !(isLoading || isFetching)) {
    return <ErrorMsg errorMsg={errorMsg} />;
  }
  if (rows.length === 0 && !(isLoading || isFetching)) {
    return <EmptyMsg type="expense" />;
  }
  return (
    <div className="table-responsive list__table__container mt-3">
      <table
        className="table bg-light mb-0"
        style={{ borderRadius: "20px", maxHeight: "60vh" }}
      >
        <thead>
          <tr>
            <td></td>
            <td></td>
            <th scope="col" style={{ minWidth: "120px" }}>
              Categoria
            </th>
            <th style={{ minWidth: "120px" }}>Concepto</th>
            <th>Fecha</th>
            <th style={{ minWidth: "100px" }}>Hora</th>
            <th></th>
            <th style={{ minWidth: "120px" }}>Cuenta</th>
            <th style={{ minWidth: "150px" }}>Notas</th>
            <th style={{ minWidth: "120px" }}>Importe</th>
            {!id && <th style={{ minWidth: "260px" }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading || (isFetching && rows.length === 0) ? (
            <LoadingList type="expense" />
          ) : (
            rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td style={{ backgroundColor: row.color }}> </td>
                  <td>
                    {" "}
                    <i className={row.icon}></i>
                  </td>
                  <th>{row.category}</th>
                  <td>{row.title}</td>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td style={{ backgroundColor: row.accountColor }}> </td>
                  <td>{row.account}</td>
                  <td>{row.description ? row.description : "N/A"}</td>
                  <td><p className={id ? "mb-3" : "mb-0"}>$ {row.price}</p></td>
                  {!id && <td>
                    <Button
                      variant="contained"
                      size="large"
                      color="warningColor"
                      className="me-2"
                      onClick={() => handleEdit(row.id)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      color="dangerColor"
                      onClick={() => handleDelete(row.id)}
                    >
                      Eliminar
                    </Button>
                  </td>}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesTable;
