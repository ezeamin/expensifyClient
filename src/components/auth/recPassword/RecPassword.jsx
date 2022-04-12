import { LoadingButton } from "@mui/lab";
import { Alert, Button, TextField } from "@mui/material";
import React, { Component } from "react";
import { getEmailFromDNI } from "../../../api/fetchingFunctions";

class RecPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      errores: {
        dni: false,
      },
      DNIError: {
        error: false,
        msg: "",
      },
      loading: false,
      sent: false,
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

    if (!this.verificar("dni", this.state.dni)) {
      this.recPassword();
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  recPassword = async () => {
    this.setState({
      DNIError: {
        error: false,
        msg: "",
      },
    });

    getEmailFromDNI(this.state.dni).then(async (res) => {
      if (res.status === 200) {
        this.setState({
          loading: false,
          sent: true,
        });
      } else {
        let msg = res.data.message;

        this.setState({
          DNIError: {
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
      <div>
        {this.state.DNIError.error && (
          <Alert severity="error" className="mb-3">
            {this.state.DNIError.msg}
          </Alert>
        )}
        <form onSubmit={(e) => this.handleSubmit(e)} className="px-5">
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
          <div className="mt-3">
            {!this.state.loading ? (
              <Button
                variant="contained"
                color="mainColor"
                type="submit"
                fullWidth
              >
                Enviar
              </Button>
            ) : (
              <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                fullWidth
              >
                Enviar
              </LoadingButton>
            )}
            {this.state.sent && <p className="mb-0 mt-2 text-success">Enviado</p>}
          </div>
        </form>
      </div>
    );
  }
}

export default RecPassword;
