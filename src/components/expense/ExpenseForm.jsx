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
import "./expenseForm.css";
import ItemList from "./itemList/ItemList";
import { LoadingButton } from "@mui/lab";

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      category: "",
      description: "",
      title: "",
      account: "",
      errores: {
        price: false,
        category: false,
        title: false,
        account: false,
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
    } else if (
      name === "price" &&
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

    let error = [false, false, false, false];

    error[0] = this.verificar("price", this.state.price);
    error[1] = this.verificar("title", this.state.title);
    error[2] = this.verificar("category", this.state.category);
    error[3] = this.verificar("account", this.state.account);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      this.props.setLoadingPost(true);

      if (this.props.isNew) this.loadExpense();
      else this.updateExpense();
    }
  };

  loadExpense = () => {
    this.props.newExpense({
      title: this.state.title,
      description: this.state.description,
      categoryId: this.state.category,
      accountId: this.state.account,
      price: this.state.price,
    });
  };

  updateExpense = () => {};

  render() {
    return (
      <form className="container px-4" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="expense__priceBox dangerBox">
          <p className="expense__priceBox__dollarSign">$</p>
          <input
            className="expense__priceBox__input"
            placeholder="xx.xx"
            value={this.state.price}
            name="price"
            type="number"
            step="0.01"
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
        </div>
        <div className="expense__dataBox">
          <FormControl error={this.state.errores.title} fullWidth>
            <TextField
              error={this.state.errores.title}
              label="Concepto"
              variant="outlined"
              value={this.state.title}
              name="title"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
              className={this.props.rounded.round}
            />
            {this.state.errores.title ? (
              <FormHelperText>Concepto no valido</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            className="mt-2"
            error={this.state.errores.category}
          >
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              error={this.state.errores.category}
              label="Categoria"
              value={this.state.category}
              name="category"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
              className={this.props.rounded.round}
            >
              {this.props.categoriesList.map((category, index) => {
                return (
                  <MenuItem key={index} value={category.id}>
                    <ItemList {...category} type="category" />
                  </MenuItem>
                );
              })}
            </Select>
            {this.state.errores.category ? (
              <FormHelperText>Seleccione una categoria</FormHelperText>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            className="my-2"
            error={this.state.errores.account}
          >
            <InputLabel id="demo-simple-select-label">Cuenta</InputLabel>
            <Select
              error={this.state.errores.account}
              label="Cuenta"
              value={this.state.account}
              name="account"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
              className={this.props.rounded.round}
            >
              {this.props.accountsList.map((account, index) => {
                return (
                  <MenuItem key={index} value={account.id}>
                    <ItemList {...account} type="account" />
                  </MenuItem>
                );
              })}
            </Select>
            {this.state.errores.account ? (
              <FormHelperText>Seleccione una cuenta</FormHelperText>
            ) : null}
          </FormControl>
          <TextField
            error={this.state.errores.description}
            multiline
            fullWidth
            rows={3}
            label="Notas"
            placeholder="Boludeces seguro"
            variant="outlined"
            value={this.state.description}
            name="description"
            onChange={(e) => this.handleChange(e)}
            className={this.props.rounded.round}
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
            color="dangerColor"
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
              startIcon={null}
              variant="outlined"
            >
              Guardar
            </LoadingButton>
          </div>
        )}
      </form>
    );
  }
}

export default ExpenseForm;
