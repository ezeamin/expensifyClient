import React from "react";
import Navegation from "../../navegation/Navegation";
import Title from "../../titles/Title";
import OldAccordions from "./oldAccordions/OldAccordion";
import BackButton from "../../backButton/BackButton";
import { useQuery } from "react-query";
import { getData } from "../../../api/fetchingFunctions";
import Loading from "../../error and loading/Loading";
import Box from "../../app/resumen/box/Box";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Old = () => {
  const [list, setList] = React.useState([]);
  const [year, setYear] = React.useState(new Date().getFullYear());

  const yearList = [];
  for (let i = 2022; i <= new Date().getFullYear(); i++) {
    yearList.push(i);
  }

  const { isLoading, isError, refetch } = useQuery(
    ["categoriesChart"],
    () => getData(`/api/periods/${year}`),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setList(data.data.periods);
        }
      },
    }
  );

  React.useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <>
      <div className="container position-relative h-100">
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
            <div className="d-flex align-items-center my-2 w-100">
              <p className="fw-bold text-light me-3 mb-0">Año</p>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                name="year"
                fullWidth
                sx={{
                  "& .MuiSelect-outlined": { backgroundColor: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { display: "none" },
                }}
              >
                {yearList.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </div>
            {list.map((item, index) => (
              <OldAccordions key={index} index={index} item={item} year={year} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Old;
