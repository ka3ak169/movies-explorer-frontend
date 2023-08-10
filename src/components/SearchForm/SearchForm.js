import React from 'react';
// import { Link } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';


function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" placeholder='Фильм' type="text" required></input>
        <div className="search-form__sbmt-btn"></div>
      </form>
      <hr className="search-form__divider" />
      <FilterCheckbox/>
    </section>
  );
}

export default SearchForm;