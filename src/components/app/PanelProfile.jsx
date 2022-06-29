import React from "react";
import { deleteDirectLogout, getData, putData } from "../../api/fetchingFunctions";
import Title from "../titles/Title";
import TabsSection from "./TabsSection";
import { useQuery, useMutation } from "react-query";
import Loading from "../error and loading/Loading";
import Error from "../error and loading/Error";
import CuadroSaldo from "./cuadroSaldo/CuadroSaldo";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const PanelProfile = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();
  const auth = useAuth();

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ["profile"],
    () => getData("/api/user"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setUser(data.data);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
        }
      },
    }
  );

  const { data: newMonthInfo } = useQuery(["getNewMonth"], () =>
    getData("/api/isNewMonth")
  );

  const { mutate: newPeriod } = useMutation(
    () => putData("/api/period", {}),
    {
      onSuccess: (data) => {
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error actualizando periodo",
            text: data.data.message
              ? data.data.message
              : "Ocurrio un error inesperado. Por favor, volvé a intentar cargar esta pagina",
          });
        }
      },
      onError: (data) => {
        let msg = data.text();
        Swal.fire({
          title: "Error actualizando periodo",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  React.useEffect(() => {
    if (newMonthInfo && newMonthInfo.status === 200) {
      if (newMonthInfo.data.isNewMonth) {
        newPeriod();
        Swal.fire({
          title: "Felicidades",
          html: "Sobreviviste a un nuevo mes<br><br>Tus datos están siendo guardados y movidos a archivo",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
    }
  }, [newMonthInfo,newPeriod]);

  if (isLoading || (isFetching && !user.name)) return <Loading />;
  if (isError || data.status !== 200)
    return <Error data={{ data: { message: "Error de servidor" } }} />;
  return (
    <>
      <div className="container">
        <Title type="profile" name={user.name} />
        <CuadroSaldo isSuccess={isSuccess} data={data} />
      </div>
      <TabsSection page="profile" />
    </>
  );
};

export default PanelProfile;
