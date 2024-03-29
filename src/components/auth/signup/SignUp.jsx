import React, { Component } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import { postData, postLogin } from "../../../api/fetchingFunctions";
import Swal from "sweetalert2";
import SaveIcon from "@mui/icons-material/Save";
import { toUpperCase } from "../../../helpers/toUpperCase";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      dni: "",
      email: "",
      password: "",
      password2: "",
      limit: "",
      errores: {
        nombre: false,
        dni: false,
        email: false,
        password: false,
        password2: false,
        limit: false,
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

    if (value.trim() === "" || value.length < 2) {
      return this.error(errores, name);
    } else {
      switch (name) {
        case "email":
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return this.error(errores, name);
          }
          break;
        case "password":
          if (
            value.length < 6 ||
            value.length > 20 ||
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value)
          ) {
            return this.error(errores, name);
          }
          break;
        case "password2":
          if (this.state.password !== value) {
            return this.error(errores, name);
          }
          break;
        case "dni":
          if (
            !/^\d{7,8}$/i.test(this.state.dni) ||
            Number.parseInt(this.state.dni) <= 0
          ) {
            return this.error(errores, name);
          }
          break;
        case "limit":
          if (value <= 0) return this.error(errores, name);
          break;
        default:
          break;
      }
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

    let error = [false, false, false, false, false, false];

    error[0] = this.verificar("nombre", this.state.nombre);
    error[1] = this.verificar("dni", this.state.dni);
    error[2] = this.verificar("email", this.state.email);
    error[3] = this.verificar("password", this.state.password);
    error[4] = this.verificar("password2", this.state.password2);
    error[5] = this.verificar("limit", this.state.limit);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) this.signup();
    else
      this.setState({
        loading: false,
      });
  };

  signup = async () => {
    //mejorar
    // prompt("Al registrarte, confirmas tu conformidad con la privacidad de tu cuenta y datos. Por ello se entiende, que tus datos no serán compartidos con nadie ajeno a Expensify, y solo vos tendrás acceso a ellos; que Expensify no es un contador ni estadista de tus gastos, sino un registro sencillo y sin responsabilidad sobre los mismos")

    postData(`/api/signup`, {
      dni: this.state.dni,
      password: this.state.password,
      email: this.state.email,
      name: toUpperCase(this.state.nombre),
      limit: this.state.limit,
    }).then(async (res) => {
      if (res.status === 200) {
        this.setState({
          loading: false,
        });

        Swal.fire({
          title: "Bienvenido a Expensify",
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        }).then(() => {
          postLogin({
            dni: this.state.dni,
            password: this.state.password,
          });
          this.props.setInfo(res.data);
        });
      } else {
        this.setState({
          loading: false,
        });

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
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: msg,
          });
        }
      }
    });
  };

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <TextField
          error={this.state.errores.nombre}
          fullWidth
          label="Nombre o apodo"
          variant="outlined"
          size="small"
          value={this.state.nombre}
          name="nombre"
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
          onBlur={(e) => this.handleBlur(e)}
          className={this.props.rounded.round}
        />
        <div className="w-100 mt-3">
          <TextField
            error={this.state.errores.dni}
            fullWidth
            label="DNI"
            type="number"
            variant="outlined"
            size="small"
            value={this.state.dni}
            name="dni"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
        </div>
        <div className="w-100 mt-3">
          <TextField
            error={this.state.errores.email}
            fullWidth
            label="E-mail"
            variant="outlined"
            size="small"
            value={this.state.email}
            name="email"
            type="email"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
        </div>
        <div className="w-100 mt-3">
          <TextField
            error={this.state.errores.password}
            type="password"
            helperText="La contraseña debe tener al menos 6 caracteres, una mayuscula,
          una minuscula y un numero"
            fullWidth
            label="Contraseña"
            variant="outlined"
            size="small"
            value={this.state.password}
            name="password"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
        </div>
        <div className="w-100 mt-2">
          <TextField
            error={this.state.errores.password2}
            type="password"
            fullWidth
            label="Repetir contraseña"
            variant="outlined"
            size="small"
            value={this.state.password2}
            name="password2"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
        </div>
        <div className="w-100 mt-3">
          <TextField
            error={this.state.errores.limit}
            fullWidth
            label="Limite mensual inicial ($)"
            variant="outlined"
            size="small"
            value={this.state.limit}
            type="number"
            name="limit"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
        </div>
        <div className="d-flex flex-column mt-3">
          {!this.state.loading ? (
            <Button variant="contained" color="mainColor" type="submit">
              Registrarse
            </Button>
          ) : (
            <LoadingButton
              loading
              loadingPosition="start"
              variant="outlined"
              startIcon={<SaveIcon />}
            >
              Registrarse
            </LoadingButton>
          )}
        </div>
      </form>
    );
  }
}

export default SignUp;
