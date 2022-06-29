import React from "react";
import { useQuery } from "react-query";
import PanelCategories from "../../components/categories/PanelCategories";
import Navegation from "../../components/navegation/Navegation";
import { deleteDirectLogout, getData } from "../../api/fetchingFunctions";
import Loading from "../../components/error and loading/Loading";
import Error from "../../components/error and loading/Error";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  const navigate = useNavigate();
  const auth = useAuth();

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ["categories"],
    () => getData("/api/categories"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setCategories(data.data.categories);
        } else if (data.status === 403) {
          deleteDirectLogout(auth.setAuth, navigate);
        }
      },
    }
  );

  if (isLoading || (isFetching && categories.length === 0))
    return (
      <div>
        <Navegation />
        <Loading />
      </div>
    );
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
      <PanelCategories list={categories} link="/categories/new" />
    </div>
  );
};

export default Categories;
