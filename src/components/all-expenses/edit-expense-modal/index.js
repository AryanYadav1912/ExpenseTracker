import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./edit-expense-modal.css";
import { editExpense } from "../../../reduxstore/actions/expenses";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = (props) => {
  const { handleCloseBtn, details } = props;

  // State variables for form inputs
  const [description, setDescription] = useState(details.description);
  const [amount, setAmount] = useState(details.amount);
  const [category, setCategory] = useState(details.category);
  const [dueDate, setStartDate] = useState(new Date(details.dueDate));

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = () => {
    // Updated data object with form values and existing createdAt
    const updatedData = {
      dueDate,
      description,
      amount,
      category,
      createdAt: details.createdAt,
    };

    // Dispatch action to edit expense
    dispatch(editExpense(updatedData));

    // Display success toast
    toast("Data Updated Successfully !!!");

    // Close the modal
    handleCloseBtn();
  };

  return (
    <div className="modal">
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer
        position="bottom-left"
        autoClose={2000} // Auto close after 2 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      {/* Modal content */}
      <div className="modal-info">
        {/* Modal card */}
        <div className="modal-info-card">
          {/* Heading */}
          <div className="details-heading">Edit Expense</div>
          {/* Due Date input */}
          <div className="due-date-container">
            <label className="date-label">Choose Due Date - </label>
            {/* DatePicker component */}
            <DatePicker
              className="due-date"
              selected={dueDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          {/* Description input */}
          <div className="form-item">
            <label>Description</label>
            {/* Input field for description */}
            <input
              placeholder="Add Expense description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Amount input */}
          <div className="form-item">
            <label>Amount ₹</label>
            {/* Input field for amount */}
            <input
              type="Number"
              placeholder="  Enter Expense Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {/* Category input */}
          <div className="form-item">
            <label>Category</label>
            {/* Input field for category */}
            <input
              placeholder="   Enter Expense Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          {/* Buttons */}
          <div className="form-add-button">
            {/* Edit Expense button */}
            <button className="add-expense-btn" onClick={handleSubmit}>
              Edit Expense
            </button>
            {/* Cancel button */}
            &nbsp;
            <button className="cancel-btn" onClick={handleCloseBtn}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
