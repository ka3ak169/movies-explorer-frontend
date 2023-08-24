import React from "react";
import { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../utils/useFormValidation";
import { useLocation } from "react-router-dom";

function SearchForm({
  onGetFilms,
  setIsChecked,
  isChecked,
  lastSearchText,
  isLoading,
  allFilms,
  onDutaionFilter,
  setRenderedMoviesFilms,
  setSearching,
  filmsToMovies,
  setFilmsToMovies,
  setNomatches,
}) {
  const location = useLocation();
  const { values, errors, handleChange, setErrors, setValue } =
    useFormValidation();

  useEffect(() => {
    if (lastSearchText) {
      setValue("filmName", lastSearchText);
    }
  }, [location.pathname, isLoading]);

  const handleBlur = () => {
    setErrors((oldErrors) => ({ ...oldErrors, filmName: "" })); // Устанавливаем ошибку для filmName в пустую строку
  };

  function handleSubmit(evt) {
    setNomatches(false);
    evt.preventDefault();
    if (values.filmName) {
      const filtredMoviesFilms = onGetFilms(values.filmName, allFilms);
      setFilmsToMovies(filtredMoviesFilms); // не торгать
      const durationFiltered = onDutaionFilter(filmsToMovies, isChecked);

      setRenderedMoviesFilms(durationFiltered);

      const lastSearchData = {
        text: values.filmName,
        isCheckedFilter: isChecked,
      };
      localStorage.setItem("lastSearchData", JSON.stringify(lastSearchData));
      setSearching(true);
      if (filtredMoviesFilms.length === 0) {
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
      <FilterCheckbox setIsChecked={setIsChecked} isChecked={isChecked} />
    </section>
  );
}

export default SearchForm;
