import React from "react";
// import { Link } from 'react-router-dom';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../utils/useFormValidation";

function SearchForm({ onGetFilms, setIsLoading, setIsChecked, isChecked }) {
  const { values, errors, handleChange, setValue, setErrors, reset } = useFormValidation();

  const handleBlur = () => {
    setErrors((oldErrors) => ({ ...oldErrors, filmName: "" })); // Устанавливаем ошибку для filmName в пустую строку
  };

  function handleSubmit (evt) {
    evt.preventDefault();
    setIsLoading(true);
    // console.log(values.filmName);
    onGetFilms(values.filmName);
    reset();
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          className="search-form__input"
          placeholder="Фильм"
          name="filmName"
          type="text"
          value={values["filmName"] ?? ""}
          onChange={handleChange}
          onBlur={handleBlur} // Добавляем обработчик потери фокуса
          required
        ></input>
        <button className="search-form__sbmt-btn"></button>
      </form>
      <span className="search-form__error">{errors["filmName"]}</span>
      <hr className="search-form__divider" />
      <FilterCheckbox
        setIsChecked={setIsChecked}
        isChecked={isChecked}
      />
    </section>
  );
}

export default SearchForm;
