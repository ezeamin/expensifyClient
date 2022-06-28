import React from "react";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import { deleteData, getData } from "../../../api/fetchingFunctions";
import ErrorMsg from "../errorMsg/ErrorMsg";
import EmptyMsg from "../emptyMsg/EmptyMsg";
import LoadingList from "../loadingList/LoadingList";
import Swal from "sweetalert2";

const TransfersTable = () => {
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const { isLoading, isFetching } = useQuery(
    ["transfers"],
    () => getData("/api/transfers/listTransform"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setRows(data.data);
        } else {
          setError(true);
          setErrorMsg(data.data.message ? data.data.message : data.data);
        }
      },
    }
  );

  const handleEdit = (id) => {
    console.log("edit" + id);
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
        const res = await deleteData(`/api/transfer/${id}`);

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
        <thead>
          <tr>
            <td></td>
            <th>Fecha</th>
            <th style={{ minWidth: "100px" }}>Hora</th>
            <td></td>
            <th style={{ minWidth: "140px" }}>Cuenta origen</th>
            <td></td>
            <th style={{ minWidth: "140px" }}>Cuenta destino</th>
            <th style={{ minWidth: "150px" }}>Notas</th>
            <th style={{ minWidth: "120px" }}>Importe</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || (isFetching && rows.length === 0) ? (
            <LoadingList type="transfer" />
          ) : (
            rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td style={{ backgroundColor: "#FFB400" }}> </td>
                  <th>{row.date}</th>
                  <td>{row.time}</td>
                  <td style={{ backgroundColor: row.originAccountColor }}> </td>
                  <td>{row.originAccount}</td>
                  <td style={{ backgroundColor: row.destinationAccountColor }}>
                    {" "}
                  </td>
                  <td>{row.destinationAccount}</td>
                  <td>{row.description ? row.description : "N/A"}</td>
                  <td>
                    <p className="mb-3">$ {row.price}</p></td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransfersTable;
