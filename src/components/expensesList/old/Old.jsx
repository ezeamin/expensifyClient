import React from "react";
import Navegation from "../../navegation/Navegation";
import "./old.css";
import Title from "../../titles/Title";
import OldAccordions from "./oldAccordions/OldAccordion";
import BackButton from "../../backButton/BackButton";
import { useQuery } from "react-query";
import { getData } from "../../../api/fetchingFunctions";
import Loading from "../../error and loading/Loading";
import Box from "../../app/resumen/box/Box";
import { Alert } from "@mui/material";

const Old = () => {
  const [list, setList] = React.useState([]);

  const { isLoading, isError } = useQuery(
    ["categoriesChart"],
    () => getData("/api/periods"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setList(data.data.periods);
        }
      },
    }
  );

  return (
    <>
      <div className="container position-relative">
        <Navegation />
        <BackButton rightSmall />
        <Title text="Periodos" />
        {isLoading ? (
          <Loading little />
        ) : isError ? (
          <Box className="text-center py-2 w-100">
            <h2>Error</h2>
            <p className="mb-0">Se produjo un error :(</p>
          </Box>
        ) : (
          <div className="listContainer--long">
            <Alert severity="info" className="mb-2">
              Acá podes ver tus gastos e ingresos de periodos anteriores
            </Alert>
            {list.map((item, index) => (
              <OldAccordions key={index} index={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Old;
