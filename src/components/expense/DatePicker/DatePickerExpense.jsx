import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { es } from "date-fns/locale";
import { parseISO } from "date-fns";
import { FormHelperText } from "@mui/material";

export default function BasicDatePicker(props) {
  const dt = new Date();
  const month = dt.getMonth() + 1;
  const year = dt.getFullYear();

  const firstDate = `01/${month}/${year}`;

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Fecha"
        disableFuture
        minDate={parseISO(firstDate)}
        value={props.value}
        default
        onChange={(newDate) =>
          props.onChange({
            target: {
              name: "date",
              value: newDate,
            },
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            className={props.className}
            sx={{ width: "100%" }}
          />
        )}
      />
      <FormHelperText>Si es actual, no cambies la fecha</FormHelperText>
    </LocalizationProvider>
  );
}
