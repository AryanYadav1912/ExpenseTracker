import React from "react";
import "./success-modal.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const SuccessModal = ({ modalOpen, setModalOpen }) => {
  // Custom styles for the modal
  const customStyles = {
    content: {
      top: "40%", // Position from top
      left: "50%", // Position from left
      right: "auto",
      bottom: "auto",
      marginRight: "-50%", // Center horizontally
      transform: "translate(-50%, -50%)", // Center vertically
      backgroundColor: "white", // Background color
      borderRadius: "10px", // Border radius
    },
  };

  return (
    <Modal isOpen={modalOpen} style={customStyles}>
      {/* Modal content */}
      <div className="modal-inner">
        {/* Success message */}
        <label>Expense Added Successfully</label>
        {/* Image indicating success */}
        <img
          src={require("../../assets/images/added-image.png").default}
          alt="Expense Added Successfully"
          className="added-image"
        />
        {/* Link to navigate back to home */}
        <Link to="/">
          <div className="take-home-button">
            <i className="fi-rr-home"></i>
            Home
          </div>
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessModal;
