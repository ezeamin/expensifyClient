import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
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
import Layout from "./views/routing/Layout";
import CannotBeLogged from "./views/routing/CannotBeLogged";
import RequireAuth from "./views/routing/RequireAuth";
import useTheme from "./hooks/useTheme";
import Error404 from "./views/routing/error404/Error404";
import Old from "./components/expensesList/old/Old";

function App() {
  return (
    <ThemeProvider theme={useTheme()}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Auth routes */}
          <Route element={<CannotBeLogged />} >
            <Route path="/auth/login" element={<Auth />} />
            <Route path="/auth/signup" element={<Auth />} />
            <Route path="/auth/recPassword" element={<Auth />} />
            <Route path="/auth/recPassword/:recCode" element={<Auth />} />
          </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppPage />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/old" element={<Old />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={<NewCategory />} />
          <Route path="/accounts/new" element={<NewAccount />} />
          <Route path="/info/:id" element={<InfoList />} />
          <Route path="/newExpense" element={<NewExpense />} />
          <Route path="/newExpense/expense" element={<Expense />} />
          <Route path="/newExpense/income" element={<Income />} />
          <Route path="/newExpense/transfer" element={<Transfer />} />
        </Route>

        {/* 404 Error route */}
        <Route path="*" element={<Error404 />} />
      </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
