import React from "react";
import './categoryForm.css';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;

