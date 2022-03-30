import React from "react";
import { Tabs, Tab } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Resumen from "./resumen/Resumen";
import Settings from "./settings/Settings";
import "./tabsSection.css";
import PanelExpensesTable from "../expensesList/expensesTable/PanelExpensesTable";
import PanelIncomesTable from "../expensesList/incomesTable/PanelIncomesTable";
import PanelTransfersTable from "../expensesList/transfersTable/PanelTransfersTable";

let estilo = window.getComputedStyle(document.body);
let warningColor = estilo.getPropertyValue("--color-warning");
let successColor = estilo.getPropertyValue("--color-success");
let dangerColor = estilo.getPropertyValue("--color-danger");

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      disabled: "#fff",
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
        centered
      >
        <Tab label={props.page === "profile" ? "Resumen" : "Gastos"} />
        <Tab label={props.page === "profile" ? "Graficos" : "Ingresos"} />
        <Tab label={props.page === "profile" ? "Ajustes" : "Transfers"} />
      </Tabs>
      <div className="container">
        <TabPanel index={0}>
          {props.page === "profile" ? <Resumen /> : <PanelExpensesTable />}
        </TabPanel>
        <TabPanel index={1}>
          {props.page === "profile" ? <p>AGREGAR</p> : <PanelIncomesTable />}
        </TabPanel>
        <TabPanel index={2}>
        {props.page === "profile" ? <Settings /> : <PanelTransfersTable />}
        </TabPanel>
      </div>
    </ThemeProvider>
  );
};

export default TabsSection;
