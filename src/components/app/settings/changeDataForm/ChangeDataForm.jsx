import React from "react";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import { getData, putData } from "../../../../api/fetchingFunctions";
import SettingItem from "../settingItem/SettingItem";
import { toUpperCase } from "../../../../helpers/toUpperCase";

const ChangeDataForm = () => {
  const [userData, setUserData] = React.useState({});

  const { isLoading, isError } = useQuery(
    ["gastado"],
    () => getData("/api/auth"),
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setUserData(data.data.user);
        }
      },
    }
  );

  const { mutate } = useMutation((info) => putData("/api/user", info), {
    onSuccess: (data) => {
      if (!data || data.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.data.message
            ? data.data.message
            : "Error al modificar los datos",
        });
      } else {
        Swal.fire({
          title: "Datos modificados",
          text: "Vuelve a iniciar sesión para ver los cambios",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          window.location.reload();
        });
      }
    },
    onError: (data) => {
      let msg = data.text();
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
      });
    },
  });

  const handleClickApodo = async () => {
    const { value: newApodo } = await Swal.fire({
      title: "Ingresá el nuevo apodo",
      input: "text",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un valor";
        }
      },
    });

    if (newApodo) {
      mutate({
        name: toUpperCase(newApodo),
      });
    }
  };

  const handleClickEmail = async () => {
    const { value: newEmail } = await Swal.fire({
      title: "Ingresá el nuevo mail",
      input: "email",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        value.trim();
        
        if (!value) {
          return "Debes ingresar un valor";
        }

        if (
          value.length > 40 ||
          value.length < 3 ||
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        )
          return "Debes ingresar un mail valido";
      },
    });

    if (newEmail) {
      mutate({
        email: newEmail,
      });
    }
  };

  if (isLoading)
    return (
      <div className="my-3">
        <h3>Datos personales</h3>
        <hr className="my-1" />
        <p className="text-center">Cargando datos...</p>
      </div>
    );

  if (isError)
    return (
      <div className="my-3">
        <h3>Datos personales</h3>
        <hr className="my-1" />
        <p className="text-center">Error al cargar datos</p>
      </div>
    );

  return (
    <div className="my-3">
      <h3>Datos personales</h3>
      <hr className="my-1" />
      <p className="mb-0">
        Apodo: <span className="fw-bold">{userData.name}</span>
      </p>
      <p className="mb-0">
        DNI: <span className="fw-bold">{userData.dni}</span>
      </p>
      <p className="mb-0">
        E-mail: <span className="fw-bold">{userData.email}</span>
      </p>
      <p>
        Conectado desde:{" "}
        <span className="fw-bold">
          {new Date(userData.incorporation).toLocaleDateString()}
        </span>
      </p>
      <hr />
      <SettingItem title="Cambiar apodo" onclick={handleClickApodo} />
      <SettingItem title="Cambiar mail" onclick={handleClickEmail} />
    </div>
  );
};

export default ChangeDataForm;
