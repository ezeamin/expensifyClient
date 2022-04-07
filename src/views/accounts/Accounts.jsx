import React from "react";
import Navegation from "../../components/navegation/Navegation";
import PanelCategoriesNAccounts from "../../components/categories/PanelCategoriesNAccounts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { getAccounts } from "../../api/fetchingFunctions";
import Loading from "../../components/error and loading/Loading";
import Error from "../../components/error and loading/Error";

const Accounts = () => {
  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState([]);
  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(["categories"], getAccounts, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setAccounts(data.data.accounts);
      }
    },
  });

  if(isLoading || (isFetching && accounts.length===0)) return <div>
    <Navegation />
    <Loading />
  </div>;
  if ((isSuccess || isError) && data.status !== 200)
  return (
    <div>
      <Navegation />
      <Error data={data} />
    </div>
  );
  return (
    <div>
      <Navegation />
      <PanelCategoriesNAccounts
        list={accounts}
        type="account"
        link="/accounts/new"
      />
    </div>
  );
};

export default Accounts;
