import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./all-expenses.css";
import Dropdown from "./dropdown";
import ExpenseTable from "./expense-table";

// Function to get unique categories from expense list
const getUniqueCategories = (list) => {
  let uniqueList = list.map((item) => item.category);
  uniqueList = ["All", ...new Set(uniqueList)]; // Include "All" in unique categories
  return uniqueList;
};

const AllExpenses = () => {
  // Get expense list from Redux store
  let { expenseList: list } = useSelector((state) => state.expenses);

  // State variables
  const [listArr, setListArr] = useState(list);
  const [currentCategorySearched, setCurrentCategorySearched] = useState("All");

  // Generate dropdown categories list
  let categoryList = getUniqueCategories(list);
  const dropdownCategories = [{ types: categoryList }];

  // Function to filter expenses by category
  const filterByCategory = (category) => {
    setCurrentCategorySearched(category);
    let filteredList = list; // Create a copy of the original list
    if (category !== "All") {
      filteredList = list.filter((item) => item.category === category);
    }
    setListArr(filteredList); // Update the displayed list
  };

  // Effect to update the listArr when list changes
  useEffect(() => {
    setListArr(list);
  }, [list]);

  // Effect to filter list based on selected category
  useEffect(() => {
    let filteredList = list; // Create a copy of the original list
    if (currentCategorySearched !== "All") {
      filteredList = list.filter((item) => item.category === currentCategorySearched);
    }
    setListArr(filteredList); // Update the displayed list
  }, [currentCategorySearched, list]);

  return (
    <div className="all-expenses">
      {/* Options section */}
      <div className="all-expenses-options">
        {/* Dropdown for selecting category */}
        <div className="options-dropdown">
          <div className="dropdown-parent">
            <label className="dropdown-title-label">Choose Your Category</label>
            {/* Dropdown component */}
            <Dropdown
              options={dropdownCategories}
              onSelect={filterByCategory}
              toShow={
                currentCategorySearched === "All"
                  ? "Choose Category"
                  : currentCategorySearched
              }
            />
          </div>
        </div>
        {/* Button to add new expense */}
        <div>
          <Link to="/add-expense">
            <button className="add-expense-btn">Add Expense</button>
          </Link>
        </div>
      </div>
      {/* Expense table */}
      <div>
        <ExpenseTable list={listArr} />
      </div>
    </div>
  );
};

export default AllExpenses;
