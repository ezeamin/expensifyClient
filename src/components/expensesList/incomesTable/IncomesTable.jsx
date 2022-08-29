import React from "react";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import { deleteData, deleteDirectLogout, getData } from "../../../api/fetchingFunctions";
import ErrorMsg from "../errorMsg/ErrorMsg";
import LoadingList from "../loadingList/LoadingList";
import EmptyMsg from "../emptyMsg/EmptyMsg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth";

const IncomesTable = (props) => {
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const { id } = props;
  const link = id ? `/api/incomes/listTransform/${id}` : "/api/incomes/listTransform"

  const { isLoading, isFetching } = useQuery(
    ["incomes"],
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

  const handleEdit = (id) => {
    const income = rows.find((income) => income.id === id);
    if (income.account === "DELETED") {
      Swal.fire({
        title: "Error",
        text: "La cuenta ha sido eliminada, y no se puede modificar",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    navigate(`/newExpense/income/${id}`);
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
        const res = await deleteData(`/api/income/${id}`);

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
    return <EmptyMsg type="income" />;
  }
  return (
    <div className="table-responsive list__table__container mt-3">
      <table
        className="table bg-light mb-0"
        style={{ borderRadius: "20px", maxHeight: "50vh" }}
      >
        <thead style={{position: "sticky",top:"0",backgroundColor:"#eeeeee"}}>
          <tr>
            <td></td>
            <th scope="col" style={{ minWidth: "120px" }}>
              Concepto
            </th>
            <th>Fecha</th>
            <th style={{ minWidth: "100px" }}>Hora</th>
            <td></td>
            <th style={{ minWidth: "120px" }}>Cuenta</th>
            <th style={{ minWidth: "150px" }}>Notas</th>
            <th style={{ minWidth: "120px" }}>Importe</th>
            {!id && <th style={{ minWidth: "260px" }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {isLoading || (isFetching && rows.length === 0) ? (
            <LoadingList type="income" />
          ) : (
            rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td style={{ backgroundColor: "#77dd77" }}> </td>
                  <th>{row.title}</th>
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

export default IncomesTable;
