import React from "react";
import Title from "../titles/Title";
import "./expensesList.css";
import TabsSection from "../app/TabsSection";
import { Link } from "react-router-dom";

const PanelExpensesList = () => {
  return (
    <>
      <div className="container position-relative">
        <Title text="Datos" />
        <Link to="/expenses/old" className="dataList__historyButton">
          <i className="fa-solid fa-clock-rotate-left"></i>
        </Link>
      </div>
      <TabsSection page="lists" />
    </>
  );
};

export default PanelExpensesList;
