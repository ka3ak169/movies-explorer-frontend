import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../utils/useFormValidation";

function SearchFormSave({
  location,
  onGetFilms,
  isCheckedSaved,
  setIsCheckedSaved,
  savedFilms,
  setSavedToFilms,
  setRenderedSavesFilms,
  onDutaionFilter,
  setNomatches,
  setSearching,
}) {
  const { values, errors, handleChange, setErrors } =
    useFormValidation();
  const handleBlur = () => {
    setErrors((oldErrors) => ({ ...oldErrors, filmName: "" })); // Устанавливаем ошибку для filmName в пустую строку
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    setNomatches(false);

    if (values.filmName) {
      const getSavedFilmsArray = onGetFilms(values.filmName, savedFilms);
      setSavedToFilms(getSavedFilmsArray); // не торгать
      const filtered = onDutaionFilter(getSavedFilmsArray, isCheckedSaved);
      setRenderedSavesFilms(filtered);
      setSearching(true);

      if (filtered.length === 0) {
        setNomatches(true);
      }
    } else {
      setErrors({ filmName: "Нужно ввести ключевое слово" });
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
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
        <button className="search-form__sbmt-btn" type="submit"></button>
      </form>
      <span className="search-form__error">{errors["filmName"]}</span>
      <hr className="search-form__divider" />
      <FilterCheckbox
        location={location}
        isCheckedSaved={isCheckedSaved}
        setIsCheckedSaved={setIsCheckedSaved}
      />
    </section>
  );
}

export default SearchFormSave;
