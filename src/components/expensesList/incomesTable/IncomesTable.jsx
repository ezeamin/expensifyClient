import React from 'react';
import { Button } from "@mui/material";

const rows = [
    {
      id: 1,
      date: "01/01/2020",
      time: "12:00",
      title: "Pago clase",
      account: "Tarjeta BBVA 0659",
      accountColor: "#84b6f4",
      description: "Descripción del pago",
      price: "1000",
    },
    {
      id: 2,
      date: "23/03/2022",
      time: "15:45",
      title: "Regalo abuela",
      account: "Efectivo",
      accountColor: "#77dd77",
      description: "",
      price: "10000",
    },
  ];

const IncomesTable = () => {
    const handleEdit = (id) => {
        console.log("edit" + id);
      };
    
      const handleDelete = (id) => {
        console.log("delete" + id);
      };
    
      return (
        <div className="table-responsive">
          <table className="table bg-light mt-3" style={{ borderRadius: "20px", maxHeight: "50vh" }}>
            <thead>
              <tr>
                <td></td>
                <th scope="col" style={{ minWidth: "120px" }}>
                  Concepto
                </th>
                <th>Fecha</th>
                <th style={{ minWidth: "80px" }}>Hora</th>
                <td></td>
                <th style={{ minWidth: "120px" }}>Cuenta</th>
                <th style={{ minWidth: "150px" }}>Notas</th>
                <th style={{ minWidth: "100px" }}>Importe</th>
                <th style={{ minWidth: "260px" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
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
              })}
            </tbody>
          </table>
        </div>
      );
};

export default IncomesTable;