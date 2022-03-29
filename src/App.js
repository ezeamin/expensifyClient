import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./views/auth/Auth";
import AppPage from "./views/app/AppPage";
import Expenses from "./views/expenses/Expenses";
import Accounts from "./views/accounts/Accounts";
import Categories from "./views/categories/Categories";
import NewExpense from "./views/newExpense/NewExpense";
import Expense from "./views/newExpense/expense/Expense";
import Income from "./views/newExpense/income/Income";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/newExpense" element={<NewExpense />} />
          <Route path="/newExpense/expense" element={<Expense />} />
          <Route path="/newExpense/income" element={<Income />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
