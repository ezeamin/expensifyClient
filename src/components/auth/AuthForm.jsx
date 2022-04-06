import React, { Component } from "react";
import { TextField, Checkbox, FormControlLabel, Alert } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { postLogin } from "../../fetching/fetchingFunctions";

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
        Swal.fire({
          title: "Bienvenido",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        }).then(()=>{
          this.props.redirectSuccess();
        })
      } else {
        let msg = " ";

        try {
          const data = await res.json();
          msg = data.message;

          if (msg === "Usuario ya autenticado") {
            Swal.fire({
              title: "Usuario ya autenticado",
              text: " ",
              icon: "info",
              timer: 1500,
              showCancelButton: false,
              showConfirmButton: false,
            }).then(() => {
              this.props.redirectSuccess();
            });
            return;
          }
        } catch (e) {
          const data = await res.text();
          msg = data;
        }
        this.setState({
          loginError: {
            error: true,
            msg: msg,
          },
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
            className="w-100"
            label="DNI"
            variant="outlined"
            size="small"
            value={this.state.dni}
            name="dni"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
          />
          <TextField
            error={this.state.errores.password}
            type="password"
            className="w-100 mt-3"
            label="Contraseña"
            variant="outlined"
            size="small"
            value={this.state.password}
            name="password"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
          />
          <div className="d-flex flex-column mt-1">
            <FormControlLabel
              control={
                <Checkbox
                  value={this.state.rememberMe}
                  onChange={(e) =>
                    this.setState({ rememberMe: !this.state.rememberMe })
                  }
                />
              }
              label="Recordarme"
              fontFamily="custom"
            />
            <Button variant="contained" color="mainColor" type="submit">
              Continuar
            </Button>
          </div>
        </form>
      </>
    );
  }
}

export default AuthForm;
