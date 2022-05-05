import { Alert, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import EnConstruccion from "../../temp/EnConstruccion";

const PagosList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        color="mainColor"
        onClick={() => navigate("/payments/new")}
        className="mb-3"
        fullWidth
      >
        Nuevo pago
      </Button>
      <Alert severity="info" className="mb-2">
        Acá podes cargar los pagos recurrentes
      </Alert>
      <EnConstruccion />
    </div>
  );
};

export default PagosList;
