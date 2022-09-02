import React from "react";
import Navegation from "../../components/navegation/Navegation";
import PanelAccounts from "../../components/accounts/PanelAccounts";
import { useQuery } from "react-query";
import { deleteDirectLogout, getData } from "../../api/fetchingFunctions";
import Loading from "../../components/error and loading/Loading";
import Error from "../../components/error and loading/Error";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Accounts = () => {
  const [accounts, setAccounts] = React.useState([]);

  const navigate = useNavigate();
  const auth = useAuth();

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ["categories"],
    () => getData("/api/accounts"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setAccounts(data.data.accounts);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
        }
      },
    }
  );

  if (isLoading || (isFetching && accounts.length === 0))
    return (
      <>
        <Navegation />
        <Loading />
      </>
    );
  if ((isSuccess || isError) && data.status !== 200)
    return (
      <>
        <Navegation />
        <Error data={data} />
      </>
    );
  return (
    <>
      <Navegation />
      <PanelAccounts list={accounts} link="/accounts/new" />
    </>
  );
};

export default Accounts;
