import Swal from 'sweetalert2';
import axios from './axios';
import { categorias } from '../data/defaultCategories';

let estilo = window.getComputedStyle(document.body);
let successColor = estilo.getPropertyValue('--color-success');
let dangerColor = estilo.getPropertyValue('--color-danger');

// initiate server

export const pingServer = async () => {
  await axios.get('/api/ping');
};

// auth

export const postLogin = async (user) => {
  let res, data;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  try {
    res = await axios.post(`/api/signin`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
      },
    });
    data = {
      status: res.status,
      data: res.data,
    };
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
  } catch (err) {
    let msg = err.response ? err.response.data : err;
    let status = err.response ? err.response.status : err;

    if (msg.accessToken) {
      localStorage.setItem('accessToken', msg.accessToken);
      localStorage.setItem('refreshToken', msg.refreshToken);
    }

    data = {
      status: status,
      data: msg,
    };
  }
  return data;
};

export const deleteLogout = (setAuth, navigate) => {
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Cerrarás tu sesión',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: successColor,
    cancelButtonColor: dangerColor,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.value) {
      axios
        .delete('/api/logout', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            refresh: refreshToken,
          },
        })
        .then((data) => {
          if (data.status === 204) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            Swal.fire({
              title: 'Adios',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              setAuth(null);
              navigate('/auth/login');
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cerrar la sesión',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: `No se pudo cerrar la sesión (${err})`,
            icon: 'error',
          });
        });
    }
  });
};

export const deleteDirectLogout = (setAuth, navigate) => {
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  setAuth(null);

  axios
    .delete('/api/logout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
      },
    })
    .then((data) => {
      navigate('/auth/login');
    });
};

//setters

export const postData = async (link, info) => {
  let res, data;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  try {
    res = await axios.post(link, info, {
      headers: {
        'Content-Type': 'application/json',
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

export const putData = async (link, info) => {
  let res, data;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  try {
    res = await axios.put(link, info, {
      headers: {
        'Content-Type': 'application/json',
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

//getters

export const getData = async (link) => {
  let res, data;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  const isDollar = link.includes('bluelytics');

  const headers = !isDollar
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
      }
    : {};

  try {
    res = await axios.get(link, {
      headers,
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

// delete

export const deleteData = async (link) => {
  let res, data;
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  try {
    res = await axios.delete(link, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        refresh: refreshToken,
      },
    });
    data = {
      status: res.status,
      data: res?.data,
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

export const cargarPackCategorias = () => {
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  categorias.forEach(async (categoria) => {
    try {
      await axios.put('/api/category', categoria, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          refresh: refreshToken,
        },
      });
    } catch (err) {
      throw err;
    }
  });
};
