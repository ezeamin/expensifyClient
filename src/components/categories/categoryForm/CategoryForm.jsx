import React, { Component } from "react";
import { TextField, FormControl, FormHelperText } from "@mui/material";
import { Button } from "@mui/material";
import IconPicker from "react-icon-picker";
import "./categoryForm.css";

const icons = [
  "fa-solid fa-utensils",
  "fa-solid fa-candy-cane",
  "fa-solid fa-ice-cream",
  "fa-solid fa-tshirt",
  "fa-solid fa-car",
  "fa-solid fa-bus",
  "fa-solid fa-bicycle",
  "fa-solid fa-plane",
  "fa-solid fa-briefcase",
  "fa-solid fa-file-invoice-dollar",
  "fa-solid fa-building-columns",
  "fa-solid fa-dumbbell",
  "fa-solid fa-home",
  "fa-solid fa-hotel",
  "fa-solid fa-shopping-cart",
  "fa-solid fa-shopping-basket",
  "fa-solid fa-champagne-glasses",
  "fa-solid fa-dice",
  "fa-solid fa-gift",
  "fa-solid fa-film",
  "fa-solid fa-music",
  "fa-solid fa-cannabis",
  "fa-solid fa-paw",
  "fa-solid fa-staff-aesculapius",
  "fa-solid fa-hand-holding-heart",
  "fa-solid fa-pills",
  "fa-solid fa-book",
  "fa-solid fa-cross",
  "fa-solid fa-globe",
  "fa-solid fa-user-group",
  "fa-solid fa-child",
  "fa-solid fa-baby",
  "fa-solid fa-circle-question",
];

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      icon: "",
      limit: "",
      description: "",
      errores: {
        title: false,
        limit: false,
      },
    };
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

    let error = [false, false];

    error[0] = this.verificar("title", this.state.title);
    error[1] = this.verificar("limit", this.state.limit);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      if (this.props.type === "new") this.loadCategory();
      else this.updateCategory();
    }
  };

  loadCategory = () => {};

  updateCategory = () => {};

  render() {
    return (
      <form className="container px-4" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="expense__dataBox text-center">
          <IconPicker
            icons={icons}
            defaultValue="fas fa-utensils"
            onChange={(icon) => this.setState({ ...this.state, icon })}
          />
          <FormControl error={this.state.errores.title} fullWidth>
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
          <FormControl
            error={this.state.errores.limit}
            fullWidth
            className="mt-2"
          >
            <TextField
              error={this.state.errores.limit}
              label="Limite mensual"
              variant="outlined"
              type="number"
              value={this.state.limit}
              name="limit"
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            />
            {this.state.errores.limit ? (
              <FormHelperText>Limite no valido</FormHelperText>
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
          color="successColor"
          type="submit"
          fullWidth
        >
          Guardar
        </Button>
      </form>
    );
  }
}

export default CategoryForm;
