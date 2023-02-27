// Main styles
import "./App.css";

import React, { lazy, Suspense } from "react";
import { getData } from "./api/fetchingFunctions";
import { useQuery } from "react-query";

import Swal from "sweetalert2";

// theme
import { ThemeProvider } from "@mui/material/styles";
import useTheme from "./hooks/useTheme";

// routing
import { Route, Routes } from "react-router-dom";
import Layout from "./views/routing/Layout";
import CannotBeLogged from "./views/routing/CannotBeLogged";
import RequireAuth from "./views/routing/RequireAuth";
import Error404 from "./views/routing/error404/Error404";
import Loading from "./components/error and loading/Loading";

// Main components
import Auth from "./views/auth/Auth";
import AppPage from "./views/app/AppPage";

// must load them synchronously, they contain styles for other components
import NewExpense from "./views/newExpense/NewExpense";
import Expense from "./views/newExpense/expense/Expense";
import Categories from "./views/categories/Categories";

// asynchronous components loading
const Expenses = lazy(() => import("./views/expenses/Expenses"));
const Accounts = lazy(() => import("./views/accounts/Accounts"));
const NewCategory = lazy(() =>
  import("./views/categories/newCategory/NewCategory")
);
const NewAccount = lazy(() => import("./views/accounts/newAccount/NewAccount"));
const InfoList = lazy(() => import("./views/infoList/InfoList"));
const Income = lazy(() => import("./views/newExpense/income/Income"));
const Transfer = lazy(() => import("./views/newExpense/transfer/Transfer"));
const Old = lazy(() => import("./components/expensesList/old/Old"));
const NewDebt = lazy(() => import("./views/accounts/newDebt/NewDebt"));

const App = () => {
  // Detect new period, and ping server if necessary
  const { data: newMonthInfo } = useQuery(["getNewMonth"], () =>
    getData("/api/isNewMonth")
  );

  React.useEffect(() => {
    if (newMonthInfo && newMonthInfo.status === 200) {
      if (newMonthInfo.data.isNewMonth) {
        Swal.fire({
          title: "Felicidades",
          html: "Sobreviviste a un nuevo mes<br><br>Tus datos están siendo guardados y movidos a archivo",
          timer: 3500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
    }
  }, [newMonthInfo]);

  return (
    <Suspense
      fallback={
        <div className="App">
          <Loading />
        </div>
      }
    >
      <ThemeProvider theme={useTheme()}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Auth routes */}
            <Route element={<CannotBeLogged />}>
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
              <Route path="/expenses/old/:year/:id" element={<Expenses />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/accounts/new" element={<NewAccount />} />
              <Route path="/accounts/edit/:id" element={<NewAccount edit />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/new" element={<NewCategory />} />
              <Route
                path="/categories/edit/:id"
                element={<NewCategory edit />}
              />
              <Route path="/info/:id" element={<InfoList />} />
              <Route path="/newExpense" element={<NewExpense />} />
              <Route path="/newExpense/expense" element={<Expense />} />
              <Route
                path="/newExpense/expense/:id"
                element={<Expense edit />}
              />
              <Route path="/newExpense/income" element={<Income />} />
              <Route path="/newExpense/income/:id" element={<Income edit />} />
              <Route path="/newExpense/transfer" element={<Transfer />} />
              <Route
                path="/newExpense/transfer/:id"
                element={<Transfer edit />}
              />
              <Route path="/debts/other/new" element={<NewDebt type="other" />} />
              <Route path="/debts/own/new" element={<NewDebt type="user" />} />
            </Route>

            {/* 404 Error route */}
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
