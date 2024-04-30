import React, { useState } from "react";
import "./expense-table.css";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../reduxstore/actions/expenses";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./edit-expense-modal";

const ExpenseTable = (props) => {
  // State for managing modal visibility and edit details
  const [showModal, setShowModal] = useState(false);
  const [editDetails, setEditDetails] = useState();
  
  // Destructuring props
  const { list } = props;
  
  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle expense deletion
  const handleDeleteExpense = (item) => {
    dispatch(deleteExpense(item));
    toast("Data Deleted Successfully !!!");
  };

  // Function to open edit modal
  const openEditModal = (item) => {
    setShowModal(true);
    setEditDetails(item);
  };

  // Function to hide modal
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="table">
      {/* ToastContainer for displaying toast messages */}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      {/* Table container */}
      <div className="table-container">
        {/* Table header */}
        <div className="table-header">
          <div className="table">
            <div className="table-row">
              {/* Table columns */}
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
              <div className="table-column action-head">
                <div className="">ACTIONS</div>
              </div>
            </div>
          </div>
        </div>
        {/* Table body */}
        <div className="table-body">
          <div className="table">
            {list.length ? (
              // Render rows if there are expenses
              list.map((data, i) => {
                return (
                  <div className="table-row" key={i}>
                    <div className="table-column expense-id">
                      <div className="">{i + 1}</div>
                    </div>
                    <div className="table-column date">
                      <div className="">
                        {/* Format date using dateFormat */}
                        {dateFormat(data.dueDate, "dd-mm-yyyy")}
                      </div>
                    </div>
                    <div className="table-column category">
                      <div className="">{data.category}</div>
                    </div>
                    <div className="table-column description">
                      <div className="">{data.description}</div>
                    </div>
                    <div className="table-column amount">
                      <div className="">{data.amount}</div>
                    </div>
                    <div className="table-column actions">
                      {/* Edit button */}
                      <button
                        className="action-button"
                        onClick={() => openEditModal(data)}
                      >
                        <i className="fi-sr-pencil edit-icon"></i>
                      </button>
                      {/* Delete button */}
                      <button
                        className="action-button"
                        onClick={() => handleDeleteExpense(data)}
                      >
                        <i className="fi-sr-trash delete-icon"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              // Show empty table message if no expenses
              <div className="empty-table">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/searching-in-box-3428236-2902705.png"
                  className="empty-image"
                  alt="Table Empty"
                />
                <p>
                  Uh Oh! Looks like the table is empty. Change your search
                  filters or maybe we don't have such an expense :(
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal component */}
      <div className="expenses-modal">
        {showModal ? (
          <Modal
            show={showModal}
            handleCloseBtn={hideModal}
            details={editDetails}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ExpenseTable;
