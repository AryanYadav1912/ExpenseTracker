import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./due-expense.css";
import dateFormat from "dateformat";

const DueExpenses = () => {
  // State for monthly budget limit and sorted list of expenses
  const [limit, setLimit] = useState(0);
  const [sortedListArray, setSortedListArray] = useState([]);

  // Get the list of expenses from Redux store
  const { expenseList: list } = useSelector((state) => state.expenses);

  // Function to handle input for monthly budget
  const handleMonthlyBudget = (e) => {
    setLimit(e.target.value);
  };

  // Function to highlight bills that can be paid within the budget limit
  const handleLimit = () => {
    let array = [...list];
    let totalSum = 0;

    // Reset highlight status for all items
    array.forEach((element) => {
      element["isHighlighted"] = false;
    });

    // Highlight bills that can be paid within the budget
    array.forEach((element) => {
      if (element.amount <= limit - totalSum) {
        element["isHighlighted"] = true;
        totalSum += parseInt(element.amount);
      }
    });

    // Update sorted list with highlighted items
    setSortedListArray(array);
  };

  return (
    <div className="due-expenses">
      {/* Input for monthly budget */}
      <div className="input-bill-amount">
        <label className="input-bill-amount-label">Enter your Monthly Budget</label>
        <input
          type="Number"
          className="input-bill-amount-field"
          placeholder="Budget (INR)"
          value={limit}
          onChange={handleMonthlyBudget}
        />
        <button onClick={handleLimit} className="add-expense-btn">
          Submit
        </button>
      </div>

      {/* Information about highlighted bills */}
      <div className="bills-information">
        <div className="color"></div>
        <span>Highlighted Bills That Can Be Paid</span>
      </div>

      {/* Expense table */}
      <div className="table">
        <div className="table-container">
          <div className="table-header">
            <div className="table">
              <div className="table-row">
                <div className="table-column expense-id-head">
                  <div className="">ID</div>
                </div>
                <div className="table-column date-head">
                  <div className="">DATE</div>
                </div>
                <div className="table-column category-head">
                  <div className="">CATEGORY</div>
                </div>
                <div className="table-column description-head">
                  <div className="">DESCRIPTION</div>
                </div>
                <div className="table-column amount-head">
                  <div className="">AMOUNT (INR)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Table body */}
          <div className="table-body">
            <div className="table">
              {/* Render expense rows */}
              {sortedListArray.length ? (
                sortedListArray.map((data, i) => {
                  return (
                    <div key={i} className="table-row">
                      <div className={data["isHighlighted"] ? "table-column expense-id highlighted" : "table-column expense-id"}>
                        <div>{i + 1}</div>
                      </div>
                      <div className={data["isHighlighted"] ? "table-column date highlighted" : "table-column date"}>
                        <div>{dateFormat(data.dueDate, "dd-mm-yyyy")}</div>
                      </div>
                      <div className={data["isHighlighted"] ? "table-column category highlighted" : "table-column category"}>
                        <div>{data.category}</div>
                      </div>
                      <div className={data["isHighlighted"] ? "table-column description highlighted" : "table-column description"}>
                        <div>{data.description}</div>
                      </div>
                      <div className={data["isHighlighted"] ? "table-column amount highlighted" : "table-column amount"}>
                        <div>{data.amount}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // Show message if table is empty
                <div className="empty-table">
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/searching-in-box-3428236-2902705.png"
                    className="empty-image"
                    alt="Table Empty"
                  />
                  <p>Uh Oh! Looks like the table is empty.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueExpenses;
