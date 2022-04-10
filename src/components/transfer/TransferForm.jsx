import React, { Component } from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { Button } from "@mui/material";

class TransferForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      description: "",
      originAccount: "",
      destinationAccount: "",
      errores: {
        price: false,
        originAccount: false,
        destinationAccount: false,
      },
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "price") {
      let length = e.target.value.length;
      if (length !== 0) e.target.style.width = length + "ch";
      else e.target.style.width = "25%";
    }
  };

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
        case "price":
          if (isNaN(value) || Number.parseFloat(value) <= 0)
            return this.error(errores, name);
          break;
        case "originAccount":
          //verificar saldo disponible
          break;
        case "destinationAccount":
          if (value === this.state.originAccount)
            return this.error(errores, name);
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

    let errorGeneral = false;

    let error = [false, false, false];

    error[0] = this.verificar("price", this.state.price);
    error[1] = this.verificar("originAccount", this.state.originAccount);
    error[2] = this.verificar(
      "destinationAccount",
      this.state.destinationAccount
    );

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral){
      if(this.props.isNew) this.loadTransfer();
      else this.updateTransfer();
    }
  };

  loadTransfer = () => {};

  updateTransfer = () => {};

  render() {
    return (
      <form className="container px-4" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="expense__priceBox warningBox">
          <p className="expense__priceBox__dollarSign">$</p>
          <input
            className="expense__priceBox__input"
            placeholder="xx.xx"
            value={this.state.price}
            type="number"
            name="price"
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
        </div>
        <div className="expense__dataBox">
          <FormControl
            fullWidth
            className="mt-2"
            error={this.state.errores.originAccount}
          >
            <InputLabel id="demo-simple-select-label">Cuenta origen</InputLabel>
            <Select
              error={this.state.errores.originAccount}
              label="Cuenta origen"
              value={this.state.originAccount}
              name="originAccount"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            >
              {this.props.accountsList.map((account, index) => {
                return (
                  <MenuItem key={index} value={account.name}>
                    <div>
                      <p className="mb-0 fw-bold">{account.name}</p>
                      <p className="mb-0">$ {account.balance}</p>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
            {this.state.errores.originAccount ? (
              <FormHelperText>Seleccione una cuenta</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            className="mt-2"
            error={this.state.errores.destinationAccount}
          >
            <InputLabel id="demo-simple-select-label">
              Cuenta destino
            </InputLabel>
            <Select
              error={this.state.errores.destinationAccount}
              label="Cuenta destino"
              value={this.state.destinationAccount}
              name="destinationAccount"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            >
              {this.props.accountsList.map((account, index) => {
                return (
                  <MenuItem key={index} value={account.name}>
                    <div>
                      <p className="mb-0 fw-bold">{account.name}</p>
                      <p className="mb-0">$ {account.balance}</p>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
            {this.state.errores.destinationAccount ? (
              <FormHelperText>Seleccione una cuenta valida</FormHelperText>
            ) : null}
          </FormControl>
          <TextField
            error={this.state.errores.description}
            className="w-100 mt-2"
            multiline
            rows={3}
            label="Notas"
            placeholder="Boludeces seguro"
            variant="outlined"
            value={this.state.description}
            name="description"
            onChange={(e) => this.handleChange(e)}
          />
          {this.state.errores.price ? (
            <li className="mb-0 mt-3 text-danger fw-bold">Importe no valido</li>
          ) : null}
        </div>
        <Button
          variant="contained"
          className="mt-3"
          size="large"
          color="warningColor"
          type="submit"
          fullWidth
        >
          Guardar
        </Button>
      </form>
    );
  }
}

export default TransferForm;
