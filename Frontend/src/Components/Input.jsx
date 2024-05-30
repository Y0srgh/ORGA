// Input.jsx
import React from "react";

const Input = ({ label, ...props }) => {
  return (
    <div className="form-inputs">
      <label htmlFor={props.id} className="form-label">
        {label}
      </label>
      <input {...props} />
    </div>
  );
};

export default Input;