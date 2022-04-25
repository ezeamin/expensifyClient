import React from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import CategoryForm from "../../../components/categories/categoryForm/CategoryForm";
import Navegation from "../../../components/navegation/Navegation";
import { putData } from "../../../api/fetchingFunctions";
import { useNavigate } from "react-router-dom";
import useRoundedBorder from "../../../hooks/useRoundedBorder";
import { icons } from "../../../data/categoryIcons";

const NewCategory = (props) => {
  const navigate = useNavigate();
  const [loadingPost, setLoadingPost] = React.useState(false);
  
  const rounded = useRoundedBorder(); //for style

  const { mutate } = useMutation((info) => putData("/api/category", info), {
    onSuccess: (data) => {
      setLoadingPost(false);
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al crear la categoria",
        });
      } else {
        Swal.fire({
          title: "Exito",
          text: "Categoria agregada",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/categories");
        });
      }
    },
    onError: (data) => {
      setLoadingPost(false);
      let msg = data.text();
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });
    },
  });

  const newCategory = async (info) => {
    mutate({
      title: info.title,
      icon: info.icon,
      limit: info.limit,
      description: info.description,
    });
  };

  return (
    <div>
      <Navegation />
      <div className="panel">
        <div className="expense__title mb-4">
          <h1>{props.name ? props.name : "Nueva categoria"}</h1>
        </div>
        <CategoryForm
          isNew={true}
          type="category"
          defaultIcon={"fa-solid fa-utensils"}
          icons={icons}
          newCategory={newCategory}
          loading={loadingPost}
          setLoadingPost={setLoadingPost}
          rounded={rounded}
        />
      </div>
    </div>
  );
};

export default NewCategory;
