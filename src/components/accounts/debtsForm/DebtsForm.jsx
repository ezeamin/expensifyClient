import React from "react";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import useRoundedBorder from "../../../hooks/useRoundedBorder";
import ItemList from "../../expense/itemList/ItemList";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { putData } from "../../../api/fetchingFunctions";
import { useNavigate } from "react-router-dom";

const DebtsForm = (props) => {
  const rounded = useRoundedBorder(); //for style

  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [debtorName, setDebtorName] = React.useState(null);
  const [account, setAccount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [titleError, setTitleError] = React.useState(false);
  const [debtorNameError, setDebtorNameError] = React.useState(false);
  const [priceError, setPriceError] = React.useState(false);
  const [accountError, setAccountError] = React.useState(false);

  const navigate = useNavigate();

  const validate = (type, value, setter) => {
    if (!value) {
      setter(true);
      return false;
    }

    switch (type) {
      case "account":
      case "text":
        if (value === "") {
          setter(true);
        } else {
          setter(false);
        }
        break;
      case "price":
        value === "" || value <= 0 || isNaN(value)
          ? setter(true)
          : setter(false);
        break;
      case "debtorName":
        !value?.id || value?.id === "new" ? setter(true) : setter(false);
        break;
      default:
        break;
    }

    return true;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        validate("text", value, setTitleError);
        break;
      case "price":
        validate("price", value, setPriceError);
        break;
      case "account":
        validate("account", value, setAccountError);
        break;
      default:
        break;
    }
  };

  const handlePriceChange = (e) => {
    let length = e.target.value.length;
    if (length !== 0) e.target.style.width = length + "ch";
    else e.target.style.width = "25%";

    setPrice(e.target.value);
  };

  const { mutate: createDebt } = useMutation(
    (info) => putData(`/api/debt/${props.type}`, info),
    {
      onSuccess: (data) => {
        setLoading(false);
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al crear la deuda",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Deuda agregada, que carnero no?",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          }).then(() => {
            navigate("/accounts");
          });
        }
      },
      onError: (data) => {
        setLoading(false);
        let msg = data.text();
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validate("text", title, setTitleError) &&
      validate("debtorName", debtorName, setDebtorNameError) &&
      validate("price", price, setPriceError) &&
      validate("account", account, setAccountError)
    ) {
      setLoading(true);
      const data = {
        title,
        price,
        nameId: debtorName.id,
        accountId: account,
        description,
        date: new Date(),
        tzOffset: new Date().getTimezoneOffset(),
      };
      createDebt(data); //y que pasa con una cuenta credito?
    }
  };

  const { mutate: mutateDebtor } = useMutation(
    (info) => putData(`/api/debts/newDebtor/${props.type}`, info),
    {
      onSuccess: (data) => {
        if (!data || data.status !== 200) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.data.message
              ? data.data.message
              : "Error al agregar deudor",
          });
        } else {
          Swal.fire({
            title: "Exito",
            text: "Deudor agregado",
            icon: "success",
            showConfirmButton: false,
            timer: 2500,
          });
          props.refetchDebtors();
        }
      },
      onError: (data) => {
        let msg = data.text();
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
        });
      },
    }
  );

  const handleNewDebtor = async () => {
    const { value } = await Swal.fire({
      title: "Ingresá el nombre del nuevo deudor",
      input: "text",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        value.trim();

        if (!value) {
          return "Debes ingresar un valor";
        }
      },
    });

    if (value) {
      mutateDebtor({
        name: value,
      });
    }
  };

  React.useEffect(() => {
    if (debtorName?.id === "new") {
      handleNewDebtor();
      setDebtorName("Seleccionar deudor");
    }
  }, [debtorName]);

  return (
    <form className="container px-4" onSubmit={(e) => handleSubmit(e)}>
      <div className="expense__priceBox dangerBox">
        <p className="expense__priceBox__dollarSign">$</p>
        <input
          className="expense__priceBox__input"
          placeholder="xx.xx"
          value={price}
          name="price"
          type="number"
          step="0.01"
          onChange={handlePriceChange}
          onBlur={(e) => handleBlur(e)}
        />
      </div>
      <div className="expense__dataBox">
        <FormControl error={titleError} fullWidth>
          <TextField
            error={titleError}
            label="Descripcion de deuda"
            variant="outlined"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => handleBlur(e)}
            className={rounded.round}
          />
          {titleError ? (
            <FormHelperText>Descripción no valida</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl fullWidth className="mt-2" error={debtorNameError}>
          <Autocomplete
            disablePortal
            options={props.debtorsList || []}
            getOptionLabel={(option) => option.name || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nombre del deudor"
                error={debtorNameError}
              />
            )}
            value={debtorName}
            onChange={(e, nv) => setDebtorName(nv)}
            className={rounded.round}
          />
          {debtorNameError ? (
            <FormHelperText>Seleccioná un deudor</FormHelperText>
          ) : null}
        </FormControl>
        <FormControl fullWidth className="my-2" error={accountError}>
          <InputLabel id="demo-simple-select-label">Cuenta</InputLabel>
          <Select
            error={accountError}
            label="Cuenta"
            value={account}
            name="account"
            onChange={(e) => setAccount(e.target.value)}
            onBlur={(e) => handleBlur(e)}
            className={rounded.round}
          >
            {props.accountsList.length > 0 ? (
              props.accountsList.map((account, index) => {
                return (
                  <MenuItem key={index} value={account.id}>
                    <ItemList {...account} type="account" />
                  </MenuItem>
                );
              })
            ) : (
              <p className="text-center mb-0 py-2">No hay cuentas</p>
            )}
          </Select>
          {accountError ? (
            <FormHelperText>Seleccioná una cuenta</FormHelperText>
          ) : null}
        </FormControl>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Notas"
          placeholder="Que mierda te debe?"
          variant="outlined"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          className={rounded.round}
        />
        {priceError ? (
          <li className="mb-0 mt-3 text-danger fw-bold">Importe no valido</li>
        ) : null}
      </div>
      {!loading ? (
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
            variant="outlined"
            startIcon={<SaveIcon />}
          >
            Guardar
          </LoadingButton>
        </div>
      )}
    </form>
  );
};

export default DebtsForm;
