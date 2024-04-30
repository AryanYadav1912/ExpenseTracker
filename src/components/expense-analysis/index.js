import React, { useState } from "react";
import "./expense-analysis.css";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import Dropdown from "../all-expenses/dropdown";
import dateFormat from "dateformat";
import { MonthsArray, MonthsMapWithNumber } from "../../constants/expenses";

// Dropdown options for selecting months
const dropdownMonths = [{ types: [...MonthsArray] }];

// Function to get all dates and amounts for a selected month
const getAllDatesInAMonth = (selectedMonth, list) => {
  // Get the numerical value of the selected month from the map
  const monthRank = MonthsMapWithNumber[selectedMonth];
  let dateArrayInMonth = [];
  let amountArrayInMonth = [];
  
  // Filter expenses based on the selected month
  const expenseDatesInMonthArray = list.filter(
    (data) => new Date(data.dueDate).getMonth() + 1 === monthRank
  );
  
  // Extract dates and amounts from filtered expenses
  for (let data of expenseDatesInMonthArray) {
    amountArrayInMonth.push(parseInt(data.amount));
    dateArrayInMonth.push(dateFormat(data.dueDate, "dd-mm-yyyy"));
  }
  
  return { expenseDatesInMonthArray, dateArrayInMonth, amountArrayInMonth };
};

const ExpenseAnalysis = () => {
  // Get the list of expenses from Redux store
  let { expenseList: list } = useSelector((state) => state.expenses);
  
  // State to track the currently selected month
  const [currentSelectedMonth, setCurrentSelectedMonth] = useState("January");
  
  // Function to filter expenses by month
  const filterByMonth = (month) => {
    setCurrentSelectedMonth(month);
  };
  
  // Get dates and amounts for the selected month
  const { dateArrayInMonth, amountArrayInMonth } = getAllDatesInAMonth(
    currentSelectedMonth,
    list
  );

  // Data object for the Line chart
  const data = {
    labels: dateArrayInMonth,
    datasets: [
      {
        label: "Expense Amount (In INR)",
        data: amountArrayInMonth,
        fill: true,
        backgroundColor: "#00baff",
        borderColor: "#99e3fd",
      },
    ],
  };

  // Options for the Line chart
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          distribution: "series",
        },
      ],
    },
  };

  return (
    <div className="analytics-chart">
      {/* Dropdown to select month */}
      <div>
        <label className="dropdown-title-label">Select Month</label>
        <Dropdown
          className="month-dropdown"
          options={dropdownMonths}
          onSelect={filterByMonth}
          toShow={currentSelectedMonth}
        />
      </div>
      {/* Line chart to display expense analysis */}
      <div className="chart">
        <Line id="expenseChart" data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseAnalysis;
