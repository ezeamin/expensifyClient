import React from "react";
import Title from "../titles/Title";
import "./expensesList.css";
import TabsSection from "../app/TabsSection";

const PanelExpensesList = () => {
  return (
    <>
      <div className="container position-relative">
        <Title text="Datos" />
        <a href="#" className="dataList__historyButton"><i className="fa-solid fa-clock-rotate-left"></i></a>
      </div>
      <TabsSection page="lists" />
    </>
  );
};

export default PanelExpensesList;
