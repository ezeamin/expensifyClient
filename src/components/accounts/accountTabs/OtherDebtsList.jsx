import { Alert, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import EnConstruccion from "../../temp/EnConstruccion";

const OtherDebtsList = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        color="mainColor"
        onClick={() => navigate("/debts/other/new")}
        className="mb-3"
        fullWidth
      >
        Nueva deuda ajena
      </Button>
      <Alert severity="info" className="mb-2">
        Acá podes cargar las deudas de otros cornudos con vos
      </Alert>
      <EnConstruccion />
    </div>
  );
};

export default OtherDebtsList;
