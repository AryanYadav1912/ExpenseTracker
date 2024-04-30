import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from "../actionTypes/expenses";

// Action creator for adding an expense
export const addExpense = (data) => {
  return {
    type: ADD_EXPENSE, // Action type constant
    data, // Data to be added
  };
};

// Action creator for editing an expense
export const editExpense = (data) => {
  return {
    type: EDIT_EXPENSE, // Action type constant
    data, // Updated data
  };
};

// Action creator for deleting an expense
export const deleteExpense = (data) => {
  return {
    type: DELETE_EXPENSE, // Action type constant
    data, // Data to be deleted
  };
};
