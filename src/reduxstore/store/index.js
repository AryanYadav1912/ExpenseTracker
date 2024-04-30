import { combineReducers, createStore } from "redux";
import { expenseReducer } from "../reducers/expenses";

// Define the initial state for the store
const initialState = {};

// Combine reducers using combineReducers
const reducer = combineReducers({
  expenses: expenseReducer, // Add expenseReducer under the 'expenses' key in the state
});

// Create the Redux store using createStore and the combined reducer
const store = createStore(reducer, initialState);

export default store; // Export the created Redux store
