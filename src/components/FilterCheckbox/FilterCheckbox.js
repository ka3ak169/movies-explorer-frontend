import React from "react";
// import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


function FilterCheckbox({ setIsChecked, isChecked, isCheckedSaved, setIsCheckedSaved, location  }) {
  const handleCheckboxChange = (event) => {
    if(location === 'saved') {
      setIsCheckedSaved(event.target.checked);
    } else {
      setIsChecked(event.target.checked);   
    }     
  };

  const checkedValue = location === 'saved' ? isCheckedSaved : isChecked;

  return (
    <div className="filterCheckbox">
      <label className="filterCheckbox__switch">
        <input
          className="filterCheckbox__checkbox"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={checkedValue}
        />
        <span className="filterCheckbox__slider" />
      </label>
      <label className="filterCheckbox__sign">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
