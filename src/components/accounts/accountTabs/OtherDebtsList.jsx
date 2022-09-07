import { Alert, Button } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../api/fetchingFunctions";
import Loading from "../../error and loading/Loading";
import DebtAccordion from "./DebtAccordion/DebtAccordion";

const OtherDebtsList = () => {
  const navigate = useNavigate();
  const [debtors, setDebtors] = React.useState([]);

  const { isLoading } = useQuery(
    ["otherDebtsList"],
    () => getData("/api/debts/other"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setDebtors(data.data);
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
      <div className="listContainer listContainer--debts">
        {debtors.length > 0 ? (
          debtors.map((debtor) => (
            <DebtAccordion
              key={debtor.id}
              name={debtor?.name}
              debts={debtor?.debts || []}
              total={debtor?.total}
              personId={debtor.id}
              type="other"
            />
          ))
        ) : isLoading ? (
          <Loading little />
        ) : (
          <p className="my-5 text-center text-light fw-bold">
            Lamentablemente, no hay deudas para listar :(
          </p>
        )}
      </div>
    </div>
  );
};

export default OtherDebtsList;
