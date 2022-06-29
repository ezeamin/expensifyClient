import React, { Component } from "react";
import { TextField, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { postLogin } from "../../api/fetchingFunctions";
import "./authForm.css";
import SaveIcon from "@mui/icons-material/Save";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      password: "",
      rememberMe: false,
      errores: {
        dni: false,
        password: false,
      },
      loginError: {
        error: false,
        msg: "",
      },
      loading: false,
    };
  }

  error = (errores, name) => {
    errores[name] = true;
    this.setState({
      errores: errores,
    });
    return true;
  };

  success = (errores, name) => {
    errores[name] = false;
    this.setState({
      errores: errores,
    });
    return false;
  };

  verificar(name, value) {
    const errores = this.state.errores;

    if (value.trim() === "") {
      return this.error(errores, name);
    } else if (
      name === "dni" &&
      (!/^\d{7,8}$/i.test(this.state.dni) ||
        Number.parseInt(this.state.dni) <= 0)
    ) {
      return this.error(errores, name);
    }

    return this.success(errores, name);
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.verificar(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });
    let errorGeneral = false;

    let error = [false, false];

    error[0] = this.verificar("dni", this.state.dni);
    error[1] = this.verificar("password", this.state.password);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) this.login();
    else
      this.setState({
        loading: false,
      });
  };

  login = async () => {
    this.setState({
      loginError: {
        error: false,
        msg: "",
      },
    });

    postLogin({
      dni: this.state.dni,
      password: this.state.password,
      rememberMe: this.state.rememberMe,
    }).then(async (res) => {
      if (res.status === 200) {
        this.setState({
          loading: false,
        });

        Swal.fire({
          title: "Bienvenido",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        }).then(() => {
          this.props.setInfo(res.data);
        });
      } else {
        let msg = res.data.message;

        if (msg === "Usuario ya autenticado") {
          Swal.fire({
            title: "Ya estás autenticado",
            timer: 1500,
            icon: "info",
            showCancelButton: false,
            showConfirmButton: false,
          }).then(() => {
            this.props.redirectSuccess();
          });
          return;
        }

        if (msg === "Network Error") {
          this.setState({
            loginError: {
              error: true,
              msg: "Error de conexion",
            },
            loading: false,
          });
          return;
        }

        this.setState({
          loginError: {
            error: true,
            msg: msg,
          },
          loading: false,
        });
      }
    });
  };

  render() {
    return (
      <>
        {this.state.loginError.error && (
          <Alert severity="error" className="mb-3">
            {this.state.loginError.msg}
          </Alert>
        )}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            error={this.state.errores.dni}
            fullWidth
            label="DNI"
            variant="outlined"
            size="small"
            value={this.state.dni}
            name="dni"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
          <div className="w-100 mt-3">
            <TextField
              error={this.state.errores.password}
              type="password"
              fullWidth
              className={this.props.rounded.round}
              label="Contraseña"
              variant="outlined"
              size="small"
              value={this.state.password}
              name="password"
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
              onBlur={(e) => this.handleBlur(e)}
            />
          </div>
          <div className="text-start mt-1">
            <a
              href="/auth/recPassword"
              className="auth__box__olvidasteContraseña"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="d-flex flex-column">
            <label
              htmlFor="myToggle"
              className="toggle my-3 d-flex align-items-center"
            >
              <div>
                <input
                  type="checkbox"
                  value={this.state.rememberMe}
                  onChange={(e) =>
                    this.setState({ rememberMe: !this.state.rememberMe })
                  }
                  className="toggle__input"
                  id="myToggle"
                />
                <div className="toggle__fill"></div>
              </div>
              <div className="ms-2">Recordarme (ya va a andar!!)</div>
            </label>
            {!this.state.loading ? (
              <Button variant="contained" color="mainColor" type="submit">
                Continuar
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                Continuar
              </LoadingButton>
            )}
          </div>
        </form>
      </>
    );
  }
}

export default AuthForm;
