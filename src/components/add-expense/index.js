import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./add-expense.css";
import { addExpense } from "../../reduxstore/actions/expenses"; // Importing Redux action
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessModal from "./success-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExpense = () => {
  // State variables using useState hook
  const [description, setDescription] = useState(""); // Description input state
  const [amount, setAmount] = useState(""); // Amount input state
  const [category, setCategory] = useState(""); // Category input state
  const [dueDate, setStartDate] = useState(new Date()); // Due date input state
  const dispatch = useDispatch(); // Redux dispatch function
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const { goBack } = useHistory(); // Navigation history

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if required fields are empty
    if (description === "" || amount === "" || category === "") {
      // Display toast message if fields are empty
      toast("Please Enter Valid Data !!!");
      return; // Exit function if fields are empty
    }

    // Create data object with form values and current date
    const data = {
      dueDate,
      description,
      amount,
      category,
      createdAt: new Date(),
    };

    // Dispatch action to add expense to Redux store
    dispatch(addExpense(data));

    // Set modal open to display success modal
    setModalOpen(true);
  };

  return (
    <div className="expense-details">
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000} // Auto close after 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      {/* SuccessModal component for displaying success message */}
      <SuccessModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {/* Section for navigation buttons */}
      <div className="expense-details-options">
        {/* Back button to navigate back */}
        <div className="back-button " onClick={() => goBack()}>
          <i className="fi-rr-angle-left"></i>
          Back
        </div>
        {/* Cancel button to navigate back */}
        <div className="cancel-button back-button" onClick={() => goBack()}>
          <i className="fi-rr-cross-circle"></i>
          Cancel
        </div>
      </div>
      {/* Section for expense information form */}
      <div className="expense-info">
        {/* Heading */}
        <div className="details-heading">Add Expense</div>
        {/* Expense information card */}
        <div className="expense-info-card">
          {/* Due Date input */}
          <div className="due-date-container">
            <label className="date-label">Choose Due Date - </label>
            {/* DatePicker component for selecting due date */}
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
          {/* Submit button */}
          <div className="form-add-button">
            {/* Button to add expense */}
            <button className="add-expense-btn" onClick={handleSubmit}>
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
