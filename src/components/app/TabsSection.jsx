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
import Charts from "./charts/Charts";

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

  if (props.page === "profile")
    return (
      <ThemeProvider theme={theme}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="tabs"
          textColor="primary"
          className="profile__tabs"
          centered
        >
          <Tab label="Resumen" />
          <Tab label="Graficos" />
          <Tab label="Ajustes" />
        </Tabs>
        <div className="container">
          <TabPanel index={0}>
            <Resumen />
          </TabPanel>
          <TabPanel index={1}>
            <Charts />
          </TabPanel>
          <TabPanel index={2}>
            <Settings />
          </TabPanel>
        </div>
      </ThemeProvider>
    );

  if (props.page === "accounts")
    return (
      <ThemeProvider theme={theme}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="tabs"
          variant="scrollable"
          textColor="primary"
          className="profile__tabs"
          centered={false}
        >
          <Tab label="Cuentas" />
          <Tab label="Deudas propias" />
          <Tab label="Deudas ajenas" />
        </Tabs>
        <div>
          <TabPanel index={0}>
            <CategoryAndAccountList {...props} type={props.page} />
          </TabPanel>
          <TabPanel index={1}>
            <OwnDebtsList />
          </TabPanel>
          <TabPanel index={2}>
            <OtherDebtsList />
          </TabPanel>
        </div>
      </ThemeProvider>
    );

  if (props.page === "categories")
    return (
      <ThemeProvider theme={theme}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="tabs"
          textColor="primary"
          className="profile__tabs"
          centered
        >
          <Tab label="Categorias" />
          <Tab label="Pagos" />
        </Tabs>
        <div>
          <TabPanel index={0}>
            <CategoryAndAccountList {...props} type={props.page} />
          </TabPanel>
          <TabPanel index={1}>
            <PagosList />
          </TabPanel>
        </div>
      </ThemeProvider>
    );

  if (props.page === "lists")
    return (
      <ThemeProvider theme={theme}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="tabs"
          textColor="primary"
          className="profile__tabs"
          centered
        >
          <Tab label="Gastos" />
          <Tab label="Ingresos" />
          <Tab label="Transfers" />
        </Tabs>
        <div className="container">
          <TabPanel index={0}>
            <PanelExpensesTable />
          </TabPanel>
          <TabPanel index={1}>
            <PanelIncomesTable />
          </TabPanel>
          <TabPanel index={2}>
            <PanelTransfersTable />
          </TabPanel>
        </div>
      </ThemeProvider>
    );

    return null;
};

export default TabsSection;
