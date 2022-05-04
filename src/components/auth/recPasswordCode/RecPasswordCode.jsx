import { LoadingButton } from "@mui/lab";
import { Alert, Button, TextField } from "@mui/material";
import React from "react";

class RecPasswordCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      errores: {
        password: false,
        password2: false,
      },
      PassError: {
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

  verificar = (name, value) => {
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
  };

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

    error[0] = this.verificar("password", this.state.password);
    error[1] = this.verificar("password2", this.state.password2);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      this.changePassword();
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  changePassword = async () => {
    this.setState({
      PassError: {
        error: false,
        msg: "",
      },
    });

    //post change pass
  };

  render() {
    return (
      <div>
        {this.state.PassError.error && (
          <Alert severity="error" className="mb-3">
            {this.state.DNIError.msg}
          </Alert>
        )}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            error={this.state.errores.password}
            fullWidth
            label="Nueva contraseña"
            helperText="La contraseña debe tener al menos 6 caracteres, una mayúscula,
          una minúscula y un número"
            variant="outlined"
            type="password"
            size="small"
            value={this.state.password}
            name="password"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
          <div className="mt-2">
          <TextField
            error={this.state.errores.password2}
            fullWidth
            label="Repetir contraseña"
            variant="outlined"
            type="password2"
            size="small"
            value={this.state.password2}
            name="password2"
            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
            onBlur={(e) => this.handleBlur(e)}
            className={this.props.rounded.round}
          />
          </div>
          <div className="mt-3">
            {!this.state.loading ? (
              <Button
                variant="contained"
                color="mainColor"
                type="submit"
                fullWidth
                
            className={this.props.rounded.round}
              >
                Guardar
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                fullWidth
              >
                Guardar
              </LoadingButton>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default RecPasswordCode;
