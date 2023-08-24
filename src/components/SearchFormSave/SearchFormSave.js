import React from "react";
import { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../utils/useFormValidation";
import { useNavigate, useLocation } from "react-router-dom";

function SearchFormSave({
  location,
  onGetFilms,
  isCheckedSaved,
  setIsCheckedSaved,
  setIsLoading,
  setIsChecked,
  isChecked,
  lastSearchText,
  isLoading,
  savedFilms,
  setSavedFilms,
  saveToFilms,
  setSavedToFilms,
  onInitialFilm,
  savedFilteredFilms,
  renderedSavesFilms,
  setRenderedSavesFilms,
  setSavedFilteredFilms,
  onDutaionFilter,
}) {
  const navigate = useNavigate();
  const { values, errors, handleChange, setErrors, reset, setValue } =
    useFormValidation();

  // useEffect(() => {
  //   if (lastSearchText) {
  //     setValue("filmName", lastSearchText);
  //   }
  // }, [location.pathname, isLoading]);

  const handleBlur = () => {
    setErrors((oldErrors) => ({ ...oldErrors, filmName: "" })); // Устанавливаем ошибку для filmName в пустую строку
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log("123");
    if (values.filmName) {
      console.log(saveToFilms);

      // onInitialFilm();

      // console.log(savedFilms);

      const getSavedFilmsArray = onGetFilms(values.filmName, savedFilms);
      // setRenderedSavesFilms(getSavedFilmsArray);
      // setSavedToFilms(getSavedFilmsArray)
      // setRenderedSavesFilms(getSavedFilmsArray);
      console.log(getSavedFilmsArray);
      setSavedToFilms(getSavedFilmsArray);
      // setSearchedSaveFilms()
      const filtered = onDutaionFilter(getSavedFilmsArray, isCheckedSaved);
      console.log(filtered);


      setRenderedSavesFilms(filtered);


      // console.log(getSavedFilmsArray);
      // console.log(savedFilms);
      // setSavedFilms(getSavedFilmsArray);

      // setSavedFilteredFilms(getSavedFilmsArray); // НЕ ТРОГАТЬ
      // console.log(getSavedFilmsArray);
      // console.log(filtered);
      // setRenderedSavesFilms(filtered);
      // setIsLoading(true);
      // onGetFilms(values.filmName);
      // console.log(values.filmName);
      // navigate("/movies");
      // setValue("filmName", values.filmName);
      // console.log(values.filmName);
      // reset();
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
        // setIsChecked={setIsChecked}
        // isChecked={isChecked}
        location={location}
        isCheckedSaved={isCheckedSaved}
        setIsCheckedSaved={setIsCheckedSaved}
      />
    </section>
  );
}

export default SearchFormSave;
