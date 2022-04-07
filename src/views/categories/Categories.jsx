import React from "react";
import { isError, useQuery } from "react-query";
import PanelCategoriesNAccounts from "../../components/categories/PanelCategoriesNAccounts";
import Navegation from "../../components/navegation/Navegation";
import { getCategories } from "../../api/fetchingFunctions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/error and loading/Loading";
import Error from "../../components/error and loading/Error";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const navigate = useNavigate();

  const { isLoading, isFetching, isError, isSuccess, data } = useQuery(
    ["categories"],
    getCategories,
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setCategories(data.data.categories);
        }
      },
    }
  );

  if (isLoading || (isFetching && categories.length===0))
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
      <PanelCategoriesNAccounts
        list={categories}
        type="category"
        link="/categories/new"
      />
    </div>
  );
};

export default Categories;
