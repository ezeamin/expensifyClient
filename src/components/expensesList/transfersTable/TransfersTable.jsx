import React from "react";
import { Button } from "@mui/material";

const rows = [
  {
    id: 1,
    date: "01/01/2020",
    time: "12:00",
    originAccount: "Tarjeta BBVA 0659",
    originAccountColor: "#84b6f4",
    originAccountId: 123,
    destinationAccount: "Efectivo",
    destinationAccountColor: "#77dd77",
    destinationAccountId: 456,
    description: "Descripción de la transferencia",
    price: "1000",
  },
  {
    id: 2,
    date: "23/03/2022",
    time: "15:45",
    originAccount: "Efectivo",
    originAccountColor: "#77dd77",
    originAccountId: 456,
    destinationAccount: "Tarjeta BBVA 0659",
    destinationAccountColor: "#84b6f4",
    destinationAccountId: 123,
    description: "",
    price: "10000",
  },
];
const TransfersTable = () => {
  const handleEdit = (id) => {
    console.log("edit" + id);
  };

  const handleDelete = (id) => {
    console.log("delete" + id);
  };

  return (
    <div className="table-responsive">
      <table
        className="table bg-light mt-3"
        style={{ borderRadius: "20px", maxHeight: "50vh" }}
      >
        <thead>
          <tr>
            <td></td>
            <th>Fecha</th>
            <th style={{ minWidth: "80px" }}>Hora</th>
            <td></td>
            <th style={{ minWidth: "140px" }}>Cuenta origen</th>
            <td></td>
            <th style={{ minWidth: "140px" }}>Cuenta destino</th>
            <th style={{ minWidth: "150px" }}>Notas</th>
            <th style={{ minWidth: "100px" }}>Importe</th>
            <th style={{ minWidth: "260px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                <td style={{ backgroundColor: "#FFB400" }}> </td>
                <th>{row.date}</th>
                <td>{row.time}</td>
                <td style={{ backgroundColor: row.originAccountColor }}> </td>
                <td>{row.originAccount}</td>
                <td style={{ backgroundColor: row.destinationAccountColor }}> </td>
                <td>{row.destinationAccount}</td>
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransfersTable;
