import Swal from "sweetalert2";
import axios from "./axios";

let estilo = window.getComputedStyle(document.body);
let successColor = estilo.getPropertyValue("--color-success");
let dangerColor = estilo.getPropertyValue("--color-danger");

export const postLogin = async (user) => {
  let res, data;
  let token = localStorage.getItem("token");

  try {
    res = await axios.post(`/api/signin`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = {
      status: res.status,
      data: res.data,
    };
    localStorage.setItem("token", res.data.token);
  } catch (err) {
    let msg = err.response ? err.response.data : err;
    let status = err.response ? err.response.status : err;

    data = {
      status: status,
      data: msg,
    };
  }
  return data;
};

//categories

export const getCategories = async () => {
  let res, data;
  let token = localStorage.getItem("token");

  try {
    res = await axios.get(`/api/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = {
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    let msg = err.response ? err.response.data : err;
    let status = err.response ? err.response.status : err;

    data = {
      status: status,
      data: msg,
    };
  }
  console.log(data);
  return data;
};

export const postCategory = async (category) => {
  let res, data;
  let token = localStorage.getItem("token");

  try {
    res = await axios.put(`/api/category`, category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    data = {
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    let msg = err.response ? err.response.data : err;
    let status = err.response ? err.response.status : err;

    data = {
      status: status,
      data: msg,
    };
  }
  return data;
};

export const deleteLogout = (home) => {
  let token = localStorage.getItem("token");

  Swal.fire({
    title: "¿Estás seguro?",
    text: "Cerrarás tu sesión",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: successColor,
    cancelButtonColor: dangerColor,
    confirmButtonText: "Si",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: "Adios",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        axios
          .delete("/api/logout", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            localStorage.removeItem("token");
            home("/");
          });
      });
    }
  });
};
