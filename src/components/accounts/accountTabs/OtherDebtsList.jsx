import { Alert, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OtherDebtsList = () => {
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
        Nueva deuda ajena
      </Button>
      <Alert severity="info">
        Acá podes cargar las deudas de otros cornudos con vos
      </Alert>
    </div>
  );
};

export default OtherDebtsList;
