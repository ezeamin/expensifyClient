import React from "react";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import CategoryForm from "../../../components/categories/categoryForm/CategoryForm";
import Navegation from "../../../components/navegation/Navegation";
import { putData } from "../../../api/fetchingFunctions";
import { useNavigate } from "react-router-dom";

const icons = [
  "fa-solid fa-utensils",
  "fa-solid fa-candy-cane",
  "fa-solid fa-ice-cream",
  "fa-solid fa-tshirt",
  "fa-solid fa-car",
  "fa-solid fa-bus",
  "fa-solid fa-bicycle",
  "fa-solid fa-plane",
  "fa-solid fa-briefcase",
  "fa-solid fa-file-invoice-dollar",
  "fa-solid fa-building-columns",
  "fa-solid fa-dumbbell",
  "fa-solid fa-home",
  "fa-solid fa-hotel",
  "fa-solid fa-shopping-cart",
  "fa-solid fa-shopping-basket",
  "fa-solid fa-champagne-glasses",
  "fa-solid fa-ticket",
  "fa-solid fa-dice",
  "fa-solid fa-gift",
  "fa-solid fa-film",
  "fa-solid fa-music",
  "fa-solid fa-cannabis",
  "fa-solid fa-paw",
  "fa-solid fa-staff-aesculapius",
  "fa-solid fa-hand-holding-heart",
  "fa-solid fa-pills",
  "fa-solid fa-book",
  "fa-solid fa-cross",
  "fa-solid fa-globe",
  "fa-solid fa-user-group",
  "fa-solid fa-child",
  "fa-solid fa-baby",
  "fa-solid fa-circle-question",
];

const NewCategory = (props) => {
  const navigate = useNavigate();
  const [loadingPost, setLoadingPost] = React.useState(false);

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
        />
      </div>
    </div>
  );
};

export default NewCategory;
