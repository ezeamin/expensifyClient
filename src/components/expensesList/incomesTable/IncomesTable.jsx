import React from "react";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import { getData } from "../../../api/fetchingFunctions";
import ErrorMsg from "../errorMsg/ErrorMsg";
import LoadingList from "../loadingList/LoadingList";
import EmptyMsg from "../emptyMsg/EmptyMsg";

const IncomesTable = () => {
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const { isLoading, isFetching } = useQuery(
    ["incomes"],
    () => getData("/api/incomes/listTransform"),
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
    console.log("delete" + id);
  };

  if (error && !isLoading) {
    return <ErrorMsg errorMsg={errorMsg} />;
  }
  if (rows.length === 0 && !isLoading) {
    return <EmptyMsg type="income" />;
  }
  return (
    <div className="table-responsive">
      <table
        className="table bg-light mt-3"
        style={{ borderRadius: "20px", maxHeight: "50vh" }}
      >
        <thead>
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
            <th style={{ minWidth: "100px" }}>Importe</th>
            <th style={{ minWidth: "260px" }}>Acciones</th>
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
                  <td>$ {row.price}</td>
                  <td>
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
                  </td>
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
