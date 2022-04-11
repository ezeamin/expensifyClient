import { createTheme } from "@mui/material/styles";
import React from "react";

const useTheme = () => {
  let customTheme;

 // React.useLayoutEffect(() => {
    let estilo = window.getComputedStyle(document.body);
    let primaryColor = estilo.getPropertyValue("--color-primary");
    let warningColor = estilo.getPropertyValue("--color-warning");
    let successColor = estilo.getPropertyValue("--color-success");
    let dangerColor = estilo.getPropertyValue("--color-danger");
    let defaultFont = estilo.getPropertyValue("--font");

    customTheme = createTheme({
      palette: {
        mainColor: {
          main: primaryColor,
          contrastText: "#fff",
        },
        successColor: {
          main: successColor,
          contrastText: "#fff",
        },
        warningColor: {
          main: warningColor,
          contrastText: "#fff",
        },
        dangerColor: {
          main: dangerColor,
          contrastText: "#fff",
        },
        lightColor: {
          main: "#fff",
          disabled: "#fff",
          contrastText: "#fff",
        },
      },
      typography: {
        fontFamily: defaultFont,
      },
    });
  //},[customTheme]);

  return customTheme;
};

export default useTheme;
