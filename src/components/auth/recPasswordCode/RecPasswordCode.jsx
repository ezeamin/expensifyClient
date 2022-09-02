import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  FormControl,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import useTheme from "../../../hooks/useTheme";

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

    if (this.state.password !== this.state.password2) {
      errorGeneral = true;
    }

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
        PassError: {
          error: true,
          msg: "Datos no validos",
        }
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

    this.props.changePassword({ password: this.state.password });
  };

  render() {
    return (
      <ThemeProvider theme={()=>useTheme()}>
        {this.state.PassError.error && (
          <Alert severity="error" className="mb-3">
            {this.state.PassError.msg}
          </Alert>
        )}
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <FormControl fullWidth>
            <TextField
              error={this.state.errores.password}
              label="Nueva contraseña"
              helperText="La contraseña debe tener al menos 6 caracteres, una mayúscula,
              una minúscula y un número"
              variant="outlined"
              type="password"
              size="small"
              value={this.state.password}
              name="password"
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
              onBlur={(e) => this.handleBlur(e)}
              className={this.props.rounded.round}
            />
          </FormControl>
          <div className="mt-2">
            <TextField
              error={this.state.errores.password2}
              fullWidth
              label="Repetir contraseña"
              variant="outlined"
              type="password"
              size="small"
              value={this.state.password2}
              name="password2"
              onChange={(e) =>
                this.setState({ [e.target.name]: e.target.value })
              }
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
      </ThemeProvider>
    );
  }
}

export default RecPasswordCode;
