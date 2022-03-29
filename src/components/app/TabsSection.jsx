import React from "react";
import { Tabs, Tab } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Resumen from "./resumen/Resumen";

/*let estilo = window.getComputedStyle(document.body);
let primaryColor = estilo.getPropertyValue("--color-primary");*/

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      disabled: "#fff",
    },
  },
});

const TabsSection = () => {
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
        centered
      >
        <Tab label="Resumen" />
        <Tab label="Graficos" />
        <Tab label="Ajustes" />
      </Tabs>
      <TabPanel index={0}>
        <Resumen />
      </TabPanel>
      <TabPanel index={1}>Item Two</TabPanel>
      <TabPanel index={2}>Item Three</TabPanel>
    </ThemeProvider>
  );
};

export default TabsSection;
