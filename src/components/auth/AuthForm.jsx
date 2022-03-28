import React, { Component } from "react";
import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeButton = createTheme({
  palette: {
    mainColor: {
      main: "#4EA7A1",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
});

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      password: "",
      rememberMe: false,
      errorDNI: false,
      errorPassword: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.redirectSuccess();
  }

  render() {
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
      >
        <TextField
          error={this.state.errorDNI}
          className="w-100"
          label="DNI"
          variant="outlined"
          size="small"
          value={this.state.dni}
          name="dni"
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
        />
        <TextField
          error={this.state.errorPassword}
          type="password"
          className="w-100 mt-3"
          label="Contraseña"
          variant="outlined"
          size="small"
          value={this.state.password}
          name="password"
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
        />
        <div className="d-flex flex-column mt-1">
          <ThemeProvider theme={themeButton}>
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
          </ThemeProvider>
        </div>
      </form>
    );
  }
}

export default AuthForm;
