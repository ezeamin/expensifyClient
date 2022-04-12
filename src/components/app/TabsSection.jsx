import React from "react";
import { Tabs, Tab } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Resumen from "./resumen/Resumen";
import Settings from "./settings/Settings";
import "./tabsSection.css";
import PanelExpensesTable from "../expensesList/expensesTable/PanelExpensesTable";
import PanelIncomesTable from "../expensesList/incomesTable/PanelIncomesTable";
import PanelTransfersTable from "../expensesList/transfersTable/PanelTransfersTable";
import OwnDebtsList from "../accounts/accountTabs/OwnDebtsList";
import CategoryAndAccountList from "../categories/categoryTabs/CategoryAndAccountList";
import OtherDebtsList from "../accounts/accountTabs/OtherDebtsList";
import PagosList from "../categories/categoryTabs/PagosList";

let estilo = window.getComputedStyle(document.body);
let primaryColor = estilo.getPropertyValue("--color-primary");
let warningColor = estilo.getPropertyValue("--color-warning");
let successColor = estilo.getPropertyValue("--color-success");
let dangerColor = estilo.getPropertyValue("--color-danger");

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      disabled: "#fff",
    },
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
  },
});

const TabsSection = (props) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const TabPanel = (props) => {
    const { children, index } = props;

    return (
      <div
        role="tabpanel"
        hidden={selectedTab !== index}
        aria-labelledby={`simple-tab-${index}`}
      >
        {selectedTab === index && (
          <div className="text-start mt-3">{children}</div>
        )}
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        textColor="primary"
        className="profile__tabs"
        centered={props.page !== "accounts"}
      >
        <Tab
          label={
            props.page === "profile"
              ? "Resumen"
              : props.page === "lists"
              ? "Gastos"
              : props.page === "accounts"
              ? "Cuentas"
              : "Categorias"
          }
        />
        <Tab
          label={
            props.page === "profile"
              ? "Graficos"
              : props.page === "lists"
              ? "Ingresos"
              : props.page === "accounts"
              ? "Deudas propias"
              : "Pagos"
          }
        />
        {props.page !== "categories" ? (
          <Tab
            label={
              props.page === "profile"
                ? "Ajustes"
                : props.page === "lists"
                ? "Transfers"
                : "Deudas ajenas"
            }
          />
        ) : null}
      </Tabs>
      <div className={(props.page !== "accounts" && props.page !== "categories") ? "container" : null}>
        <TabPanel index={0}>
          {props.page === "profile" ? (
            <Resumen />
          ) : props.page === "lists" ? (
            <PanelExpensesTable />
          ) : (
            <CategoryAndAccountList {...props} type={props.page} />
          )}
        </TabPanel>
        <TabPanel index={1}>
          {props.page === "profile" ? (
            <p className="text-light">AGREGAR</p>
          ) : props.page === "lists" ? (
            <PanelIncomesTable />
          ) : props.page === "accounts" ? (
            <OwnDebtsList />
          ) : (
            <PagosList />
          )}
        </TabPanel>
        <TabPanel index={2}>
          {props.page === "profile" ? (
            <Settings />
          ) : props.page === "lists" ? (
            <PanelTransfersTable />
          ) : (
            <OtherDebtsList />
          )}
        </TabPanel>
      </div>
    </ThemeProvider>
  );
};

export default TabsSection;
