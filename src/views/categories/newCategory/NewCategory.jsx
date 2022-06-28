import React from "react";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import CategoryForm from "../../../components/categories/categoryForm/CategoryForm";
import Navegation from "../../../components/navegation/Navegation";
import { getData, putData } from "../../../api/fetchingFunctions";
import { useNavigate } from "react-router-dom";
import useRoundedBorder from "../../../hooks/useRoundedBorder";
import { icons } from "../../../data/categoryIcons";
import Loading from "../../../components/error and loading/Loading";

const NewCategory = (props) => {
  const navigate = useNavigate();
  const [loadingPost, setLoadingPost] = React.useState(false);
  const [info, setInfo] = React.useState(null);

  const rounded = useRoundedBorder(); //for style

  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];

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

  const { mutate: edit } = useMutation(
    (info) => putData("/api/category/" + id, info),
    {
      onSuccess: (data) => {
        setLoadingPost(false);
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al editar la categoria",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Categoria editada",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
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
    }
  );

  const newCategory = async (info) => {
    mutate({
      title: info.title,
      icon: info.icon,
      limit: info.limit,
      description: info.description,
    });
  };

  const editCategory = async (info) => {
    edit({
      id: props.id,
      new: info.new,
      old: info.old,
    });
  };

  const { isLoading } = useQuery(
    ["catData"],
    () => getData("/api/category/" + id),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setInfo(data.data);
        }
      },
    }
  );

  return (
    <div>
      <Navegation />
      <div className="panel">
        <div className="expense__title mb-4">
          <h1>{props.edit ? "Editar categoria" : "Nueva categoria"}</h1>
        </div>
        {props.edit && isLoading ? (
          <Loading little />
        ) : (
          <CategoryForm
            isNew={!props.edit}
            type="category"
            defaultIcon={info ? info.icon : "fa-solid fa-utensils"}
            icons={icons}
            newCategory={newCategory}
            editCategory={editCategory}
            loading={loadingPost}
            setLoadingPost={setLoadingPost}
            rounded={rounded}
            data={info}
          />
        )}
      </div>
    </div>
  );
};

export default NewCategory;
