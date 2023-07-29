import React from 'react';
// import { Link } from 'react-router-dom';

function FilterCheckbox() {
  return (
    <div className="filterCheckbox__container">
      <label className="filterCheckbox__switch">
        <input className="filterCheckbox__checkbox" type="checkbox" defaultChecked={false}/>
        <span className="filterCheckbox__slider" />
      </label>
      <label  className="filterCheckbox__sign">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;