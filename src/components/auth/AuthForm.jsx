import React, { Component } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

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

    /*let errorGeneral = false;

    let error = [false, false];

    error[0] = this.verificar("dni", this.state.dni);
    error[1] = this.verificar("password", this.state.password);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral)*/ this.login();
  };

  login = async () => {
    // fetching data

    this.props.redirectSuccess();

    /*else
    Swal.fire({
      title: "Datos incorrectos",
      text: " ",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    })*/
  }

  render() {
    return (
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
    );
  }
}

export default AuthForm;
