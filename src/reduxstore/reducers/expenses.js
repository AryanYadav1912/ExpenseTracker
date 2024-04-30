// Importing necessary constants and actionTypes
import { DefaultData } from "../../constants/expenses";
import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from "../actionTypes/expenses";

// Function to initialize the expense list from localStorage or use the default data
const initialList = () => {
  const list = localStorage.getItem("expense-list");
  let expenses = DefaultData; // DefaultData is imported from constants/expenses
  localStorage.setItem("expense-list", JSON.stringify(expenses)); // Set default data in localStorage if not present
  if (list) {
    expenses = JSON.parse(list); // Parse existing data from localStorage if present
  }
  return expenses; // Return the initialized list
};

// Define the initial state for the expense reducer
const initialState = {
  expenseList: initialList(), // Initialize expenseList using the initialList function
};

// Define the expenseReducer function with the initial state and action handlers
export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE: {
      // Add new expense to the list and update localStorage
      localStorage.setItem(
        "expense-list",
        JSON.stringify([...state.expenseList, action.data])
      );
      // Return updated state with the new expense added
      return {
        ...state,
        expenseList: [...state.expenseList, action.data],
      };
    }
    case DELETE_EXPENSE: {
      // Remove expense from the list based on the provided data's createdAt property
      const { data } = action;
      const updatedList = state.expenseList.filter(
        (item) => item.createdAt !== data.createdAt
      );
      // Update localStorage with the updated list
      localStorage.setItem("expense-list", JSON.stringify(updatedList));
      // Return updated state with the expense removed
      return {
        ...state,
        expenseList: updatedList,
      };
    }
    case EDIT_EXPENSE: {
      // Update an existing expense in the list based on the provided data's createdAt property
      const { data } = action;
      const updatedList = state.expenseList.map((item) =>
        item.createdAt === data.createdAt ? data : item
      );
      // Update localStorage with the updated list
      localStorage.setItem("expense-list", JSON.stringify(updatedList));
      // Return updated state with the expense edited
      return {
        ...state,
        expenseList: updatedList,
      };
    }
    default:
      return state; // Return the current state for other action types
  }
};
