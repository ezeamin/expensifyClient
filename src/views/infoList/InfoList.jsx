import React from "react";
import { getAccountAndCategoryData } from "../../api/fetchingFunctions";
import Navegation from "../../components/navegation/Navegation";
import PanelInfoList from "../../components/panelInfoList/PanelInfoList";
import Loading from "../../components/error and loading/Loading";
import { useQuery } from "react-query";
import Error from "../../components/error and loading/Error";

const InfoList = () => {
  const ruta = window.location.pathname;
  const split = ruta.split("/");
  const datos = split[split.length - 1];

  const typeStr = datos.split("=")[0];

  const type = typeStr === "cat" ? "category" : "account";
  const id = datos.split("=")[1];

  const [info, setInfo] = React.useState({});

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ["info", type, id],
    () => getAccountAndCategoryData(type, id),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          if (data.data.limit === 0) {
            data.data.limit = null;
          }
          setInfo(data.data);
        }
      },
    }
  );

  if (isLoading || (isFetching && Object.keys(info).length === 0))
    return (
      <div>
        <Navegation />
        <Loading />
      </div>
    );
  if ((isSuccess || isError) && data?.status !== 200)
    return (
      <div>
        <Navegation />
        <Error data={data} />
      </div>
    );
  return (
    <div>
      <Navegation />
      <PanelInfoList type={type} {...info} />
    </div>
  );
};

export default InfoList;
