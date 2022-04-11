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
import Transfer from "./views/newExpense/transfer/Transfer";
import { ThemeProvider } from "@mui/material/styles";
import NewCategory from "./views/categories/newCategory/NewCategory";
import NewAccount from "./views/accounts/newAccount/NewAccount";
import InfoList from "./views/infoList/InfoList";
import useTheme from "./hooks/useTheme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={useTheme()}>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/new" element={<NewCategory />} />
            <Route path="/accounts/new" element={<NewAccount />} />
            <Route path="/info/:id" element={<InfoList />} />
            <Route path="/newExpense" element={<NewExpense />} />
            <Route path="/newExpense/expense" element={<Expense />} />
            <Route path="/newExpense/income" element={<Income />} />
            <Route path="/newExpense/transfer" element={<Transfer />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
