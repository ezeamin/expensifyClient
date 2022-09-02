import React from "react";
import { useQuery } from "react-query";
import { deleteDirectLogout, getData } from "../../../api/fetchingFunctions";
import ErrorMsg from "../errorMsg/ErrorMsg";
import EmptyMsg from "../emptyMsg/EmptyMsg";
import LoadingList from "../loadingList/LoadingList";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const TransfersTable = (props) => {
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const { id, year } = props;
  const link = id
    ? `/api/transfers/listTransform/${year}/${id}`
    : "/api/transfers/listTransform";

  const { isLoading, isFetching } = useQuery(
    ["transfers"],
    () => getData(link),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setRows(data.data);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
        } else {
          setError(true);
          setErrorMsg(data.data.message ? data.data.message : data.data);
        }
      },
    }
  );

  if (error && !(isLoading || isFetching)) {
    return <ErrorMsg errorMsg={errorMsg} />;
  }
  if (rows.length === 0 && !(isLoading || isFetching)) {
    return <EmptyMsg type="transfer" />;
  }
  return (
    <div className="table-responsive list__table__container mt-3">
      <table
        className="table bg-light mb-0"
        style={{ borderRadius: "20px", maxHeight: "50vh" }}
      >
        <thead
          style={{
            position: "sticky",
            top: "0",
            backgroundColor: "#eeeeee",
            zIndex: 15000,
          }}
        >
          <tr>
            <td></td>
            <th>Fecha</th>
            <th style={{ minWidth: "100px" }}>Hora</th>
            <td></td>
            <th style={{ minWidth: "140px" }}>Cuenta origen</th>
            <td></td>
            <th style={{ minWidth: "140px" }}>Cuenta destino</th>
            <th style={{ minWidth: "150px" }}>Notas</th>
            <th style={{ minWidth: "120px" }}>Importe</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || (isFetching && rows.length === 0) ? (
            <LoadingList type="transfer" />
          ) : (
            rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td style={{ backgroundColor: "#FFB400" }}> </td>
                  <th>{row.date}</th>
                  <td>{row.time}</td>
                  <td style={{ backgroundColor: row.originAccountColor }}></td>
                  <td>{row.originAccount}</td>
                  <td
                    style={{ backgroundColor: row.destinationAccountColor }}
                  ></td>
                  <td>{row.destinationAccount}</td>
                  <td>{row.description ? row.description : "N/A"}</td>
                  <td>
                    <p className="mb-3">$ {row.price}</p>
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

export default TransfersTable;
