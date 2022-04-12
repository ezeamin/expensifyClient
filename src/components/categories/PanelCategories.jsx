import React from "react";
import TabsSection from "../app/TabsSection";
import Title from "../titles/Title";
import "./panelCategories.css";

const PanelCategories = (props) => {
  const container = React.useRef();

  React.useEffect(() => {
    if (props.list.length >= 5) {
      container.current.className = "container paddingBottom";
    } else if (props.list.length < 5) {
      container.current.className = "container";
    }
  }, [props.list]);

  return (
    <div className="container" ref={container}>
      <Title text="Categorias" />
      <TabsSection page="categories" data={props} />
    </div>
  );
};

export default PanelCategories;
