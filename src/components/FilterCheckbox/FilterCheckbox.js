import React from "react";
// import { Link } from 'react-router-dom';

function FilterCheckbox({ setIsChecked, isChecked }) {
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="filterCheckbox">
      <label className="filterCheckbox__switch">
        <input
          className="filterCheckbox__checkbox"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
        <span className="filterCheckbox__slider" />
      </label>
      <label className="filterCheckbox__sign">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
