import React, { Component } from "react";
import {
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Button } from "@mui/material";
import IconPicker from "react-icon-picker";
import "./categoryForm.css";
import { LoadingButton } from "@mui/lab";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      icon: this.props.defaultIcon,
      accountType: "",
      limit: "",
      description: "",
      errores: {
        title: false,
        limit: false,
        accountType: false,
      },
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

    if (value.trim() === "" || value.length < 1) {
      return this.error(errores, name);
    } else if (
      name === "limit" &&
      (isNaN(value) || Number.parseFloat(value) <= 0)
    )
      return this.error(errores, name);

    return this.success(errores, name);
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.verificar(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let errorGeneral = false;

    if (this.props.type === "category") {
      let error = [false, false];

      error[0] = this.verificar("title", this.state.title);
      error[1] = this.verificar("limit", this.state.limit);

      error.forEach((element) => {
        if (element) {
          errorGeneral = true;
        }
      });
    } else {
      let error = [false, false, false];

      error[0] = this.verificar("title", this.state.title);
      error[1] = this.verificar("accountType", this.state.accountType);
      error[2] = this.verificar("limit", this.state.limit);

      error.forEach((element) => {
        if (element) {
          errorGeneral = true;
        }
      });
    }

    if (!errorGeneral) {
      this.props.setLoadingPost(true);

      if (this.props.type === "category") {
        if (this.props.isNew) this.loadCategory();
        else this.updateCategory();
      } else {
        if (this.props.isNew) this.loadAccount();
        else this.updateAccount();
      }
    }
  };

  loadCategory = async () => {
    this.props.newCategory({
      title: this.state.title,
      icon: this.state.icon,
      limit: this.state.limit,
      description: this.state.description,
    });
  };

  updateCategory = () => {};

  loadAccount = () => {
    this.props.newAccount({
      title: this.state.title,
      icon: this.state.icon,
      accountType: this.state.accountType,
      balance: this.state.limit,
      description: this.state.description,
    });
  };

  updateAccount = () => {};

  render() {
    return (
      <form className="container px-4" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="expense__dataBox text-center">
          <IconPicker
            icons={this.props.icons}
            defaultValue={this.props.defaultIcon}
            onChange={(icon) => this.setState({ ...this.state, icon })}
          />
          <FormControl
            error={this.state.errores.title}
            fullWidth
            className="mt-3"
          >
            <TextField
              error={this.state.errores.title}
              label="Nombre"
              variant="outlined"
              value={this.state.title}
              name="title"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            />
            {this.state.errores.title ? (
              <FormHelperText>Nombre no valido</FormHelperText>
            ) : null}
          </FormControl>
          {this.props.type === "account" ? (
            <FormControl
              fullWidth
              className="mt-2"
              error={this.state.errores.accountType}
            >
              <InputLabel id="demo-simple-select-label">
                Tipo de cuenta
              </InputLabel>
              <Select
                error={this.state.errores.accountType}
                label="Tipo de cuenta"
                value={this.state.accountType}
                name="accountType"
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.handleBlur(e)}
              >
                {this.props.accountList &&
                  this.props.accountList.map((accountType, index) => {
                    return (
                      <MenuItem value={accountType} key={index}>
                        <p className="mb-0">{accountType}</p>
                      </MenuItem>
                    );
                  })}
              </Select>
              {this.state.errores.account ? (
                <FormHelperText>Seleccione un tipo de cuenta</FormHelperText>
              ) : null}
            </FormControl>
          ) : null}
          <FormControl
            error={this.state.errores.limit}
            fullWidth
            className="mt-2"
          >
            <TextField
              error={this.state.errores.limit}
              label={
                this.props.type === "category"
                  ? "Limite mensual"
                  : "Saldo actual"
              }
              variant="outlined"
              type="number"
              value={this.state.limit}
              name="limit"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            />
            {this.state.errores.limit ? (
              <FormHelperText>
                {this.props.type === "category"
                  ? "Limite no valido"
                  : "Saldo no valido"}
              </FormHelperText>
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
        {!this.state.loading ? (
          <Button
            variant="contained"
            className="mt-3"
            size="large"
            color="successColor"
            type="submit"
            fullWidth
          >
            Guardar
          </Button>
        ) : (
          <div className="forms__loadingButton mt-3">
          <LoadingButton size="large" fullWidth loading loadingPosition="start" variant="outlined">
             Guardar
          </LoadingButton>
          </div>
        )}
      </form>
    );
  }
}

export default CategoryForm;
