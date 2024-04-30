import React, { useState } from "react";
import "./dropdown.css";

const Dropdown = ({ options, onSelect, toShow }) => {
  // State to manage the dropdown's open/close state
  const [open, setOpen] = useState(false);

  // Toggle open/close state of the dropdown
  const changeHandler = () => {
    setOpen(!open);
  };

  // Handle click on an option and close the dropdown
  const handleOptionClick = (item) => {
    setOpen(!open);
    onSelect(item); // Pass selected item to parent component
  };

  return (
    <div className="topic-dropdown">
      {/* Dropdown header */}
      <div className="current-topic">
        {/* Main topic display */}
        <div className="main-topic">{toShow}</div>
        {/* Dropdown toggle button */}
        <div className="down-arrow" onClick={changeHandler} role="button">
          {/* Display arrow icon based on open/closed state */}
          {open ? (
            <i className="fi-rr-angle-up"></i> // Upward arrow when open
          ) : (
            <i className="fi-rr-angle-down"></i> // Downward arrow when closed
          )}
        </div>
      </div>
      {/* Dropdown options */}
      {open && (
        <div className="topic-list">
          {/* Map through options to display sub-topics */}
          {options.map(({ types }) => {
            return (
              <div className="topic-list-item" key={types[0]}>
                {/* Display each sub-topic */}
                <div className="sub-topic-list">
                  {types.map((item) => {
                    return (
                      <div
                        className="sub-topic-item"
                        key={item}
                        onClick={() => handleOptionClick(item)}
                        role="button"
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
