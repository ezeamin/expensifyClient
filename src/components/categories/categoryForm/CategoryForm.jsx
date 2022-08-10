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
import SaveIcon from "@mui/icons-material/Save";

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
      data: {},
    };
  }

  componentDidMount() {
    if (this.props.data) {
      const limit = this.props.data.limit // limit saves both limit and balance
        ? this.props.data.limit
        : this.props.data.balance;

      this.setState({
        title: this.props.data.title,
        icon: this.props.data.icon,
        accountType: this.props.data?.accountType,
        limit: limit + "",
        description: this.props.data.description,
        data: this.props.data,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.loading !== this.props.loading) {
      this.setState({ loading: this.props.loading });
    }

    if (window.location.href.split("/").at(-1) !== "new") {
      if (this.state.data !== this.props.data) {
        const limit = this.props.data.limit // limit saves both limit and balance
          ? this.props.data.limit
          : this.props.data.balance;

        this.setState({
          title: this.props.data.title,
          icon: this.props.data.icon,
          accountType: this.props.data?.accountType,
          limit: limit + "",
          description: this.props.data.description,
          data: this.props.data,
        });
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "accountType" && e.target.value === "Credito") {
      this.setState({ limit: "0" });
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

    if (value.trim() === "" || value.length < 1) {
      return this.error(errores, name);
    } else if (
      name === "limit" &&
      this.state.accountType !== "Credito" &&
      (isNaN(value) || Number.parseFloat(value) < 0)
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
        else this.editCategory();
      } else {
        if (this.props.isNew) this.loadAccount();
        else this.editAccount();
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

  editCategory = () => {
    this.props.editCategory({
      new: {
        title: this.state.title,
        icon: this.state.icon,
        limit: this.state.limit,
        description: this.state.description,
      },
      old: {
        title: this.props.data.title,
        icon: this.props.data.icon,
        limit: this.props.data.limit,
        description: this.props.data.description,
      },
    });
  };

  loadAccount = () => {
    this.props.newAccount({
      title: this.state.title,
      icon: this.state.icon || this.props.defaultIcon,
      accountType: this.state.accountType,
      balance: this.state.limit,
      description: this.state.description || "",
    });
  };

  editAccount = () => {
    this.props.editAccount({
      new: {
        title: this.state.title,
        icon: this.state.icon,
        accountType: this.state.accountType,
        balance: this.state.limit,
        description: this.state.description,
      },
      old: {
        title: this.props.data.title,
        icon: this.props.data.icon,
        accountType: this.props.data.accountType,
        balance: this.props.data.balance,
        description: this.props.data.description,
      },
    });
  };

  render() {
    return (
      <form className="container px-4" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="expense__dataBox">
          <div className="w-100 text-center">
            <IconPicker
              icons={this.props.icons}
              defaultValue={this.props.defaultIcon}
              onChange={(icon) => this.setState({ ...this.state, icon })}
            />
          </div>
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
              className={this.props.rounded.round}
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
                className={this.props.rounded.round}
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
              {this.state.errores.accountType ? (
                <FormHelperText>Seleccione un tipo de cuenta</FormHelperText>
              ) : null}
            </FormControl>
          ) : null}
          {this.state.accountType !== "Credito" ? (
            <FormControl
              error={this.state.errores.limit}
              fullWidth
              className="my-2"
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
                className={this.props.rounded.round}
              />
              <FormHelperText>
                {this.props.type === "category"
                  ? this.state.errores.limit
                    ? "Limite no valido. Colocar '0' para no establecer"
                    : "Colocar '0' para no establecer"
                  : this.state.errores.limit
                  ? "Saldo no valido. Colocar '0' para no establecer"
                  : "Colocar '0' para no establecer"}
              </FormHelperText>
            </FormControl>
          ) : null}
          <TextField
            error={this.state.errores.description}
            fullWidth
            multiline
            rows={3}
            label="Notas"
            placeholder="Boludeces seguro"
            variant="outlined"
            value={this.state.description}
            name="description"
            onChange={(e) => this.handleChange(e)}
            className={this.props.rounded.round}
          />
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
            <LoadingButton
              size="large"
              fullWidth
              loading
              loadingPosition="start"
              variant="outlined"
              startIcon={<SaveIcon />}
            >
              Guardar
            </LoadingButton>
          </div>
        )}
      </form>
    );
  }
}

export default CategoryForm;
