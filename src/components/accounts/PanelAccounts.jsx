import React from "react";
import Title from "../titles/Title";
import "./panelAccounts.css";
import TabsSection from "../app/TabsSection";

const PanelAccounts = (props) => {
  const container = React.useRef();

  React.useEffect(() => {
    if (props.list.length >= 5) {
      container.current.className = "container paddingBottom";
    } else if (props.list.length < 5) {
      container.current.className = "container";
    }
  }, [props.list]);

  return (
    <div ref={container}>
      <Title text="Cuentas" />
      <TabsSection page="accounts" data={props}/>
    </div>
  );
};

export default PanelAccounts;
