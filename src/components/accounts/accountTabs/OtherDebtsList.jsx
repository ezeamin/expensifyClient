import { Alert, Button } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../api/fetchingFunctions";
import DebtAccordion from "./DebtAccordion/DebtAccordion";

const OtherDebtsList = () => {
  const navigate = useNavigate();
  const [debts, setDebts] = React.useState([]);

  const { isLoading } = useQuery(
    ["otherDebtsList"],
    () => getData("/api/debts/other"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setDebts(data.data);
        }
      },
    }
  );

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
      {debts.map((debt) => (
        <DebtAccordion name={debt?.name} debts={debt?.debts} />
      ))}
    </div>
  );
};

export default OtherDebtsList;
