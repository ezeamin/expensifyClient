import Swal from "sweetalert2";
import axios from "./axios";

let estilo = window.getComputedStyle(document.body);
let successColor = estilo.getPropertyValue("--color-success");
let dangerColor = estilo.getPropertyValue("--color-danger");

// auth

export const postSignup = async (user) => {
  let res, data;
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    res = await axios.post(`/api/signup`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
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

export const postLogin = async (user) => {
  let res, data;
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    res = await axios.post(`/api/signin`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
      },
    });
    data = {
      status: res.status,
      data: res.data,
    };
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
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
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

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
      axios
        .delete("/api/logout", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            refresh: refreshToken,
          },
        })
        .then((data) => {
          if (data.status === 204) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            Swal.fire({
              title: "Adios",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              home("/");
            });
          }
          else{
            Swal.fire({
              title: "Error",
              text: "No se pudo cerrar la sesión",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: `No se pudo cerrar la sesión (${err})`,
            icon: "error",
          });
        });
    }
  });
};

// categories

export const getCategories = async () => {
  let res, data;
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    res = await axios.get(`/api/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
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

export const postCategory = async (category) => {
  let res, data;
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    res = await axios.put(`/api/category`, category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
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

// accounts

export const getAccounts = async () => {
  let res, data;
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    res = await axios.get(`/api/accounts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
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

export const postAccount = async (account) => {
  let res, data;
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    res = await axios.put(`/api/account`, account, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
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
