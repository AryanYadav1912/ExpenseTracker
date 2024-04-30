import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./reduxstore/store"; // Import the Redux store
import Header from "./components/common/header";
import AllExpenses from "./components/all-expenses";
import AddExpense from "./components/add-expense";
import ExpenseAnalysis from "./components/expense-analysis";
import DueExpenses from "./components/due-expenses";
import Footer from "./components/common/footer";

function App() {
  return (
    <Provider store={store}> {/* Wrap the entire app with the Redux Provider and pass the Redux store */}
      <div className="app">
        <Router> {/* Set up the application routing using BrowserRouter */}
          <Header /> {/* Render the Header component */}
          <Switch> {/* Define routes for different components */}
            {/* Define a route for the AllExpenses component */}
            <Route exact path="/">
              <AllExpenses />
            </Route>
            {/* Define a route for the AddExpense component */}
            <Route exact path="/add-expense">
              <AddExpense />
            </Route>
            {/* Define a route for the ExpenseAnalysis component */}
            <Route exact path="/expenses-analysis">
              <ExpenseAnalysis />
            </Route>
            {/* Define a route for the DueExpenses component */}
            <Route exact path="/due-expenses">
              <DueExpenses />
            </Route>
          </Switch>
          <Footer /> {/* Render the Footer component */}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
