import React from "react";
import { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../utils/useFormValidation";
import { useNavigate, useLocation } from "react-router-dom";

function SearchForm({
  onGetFilms,
  setIsLoading,
  setIsChecked,
  isChecked,
  lastSearchText,
  isLoading,
  filteredFilms,
  allFilms,
  onDutaionFilter,
  setRenderedMoviesFilms,
  setFilteredFilms,
  setSearching,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { values, errors, handleChange, setErrors, reset, setValue } =
    useFormValidation();

  useEffect(() => {
    if (lastSearchText) {
      console.log(lastSearchText);
      setValue("filmName", lastSearchText);
    }
  }, [location.pathname, isLoading]);

  const handleBlur = () => {
    setErrors((oldErrors) => ({ ...oldErrors, filmName: "" })); // Устанавливаем ошибку для filmName в пустую строку
  };

  // useEffect(() => {
  //   if (lastSearchText) {
  //     setValue("filmName", lastSearchText);
  //   }
  // }, [location.pathname, isLoading]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (values.filmName) {
      // setIsLoading(true);
      const getFilmsArray = onGetFilms(values.filmName, allFilms);
      console.log(getFilmsArray);
      setFilteredFilms(getFilmsArray); //НЕ ТРОГАТЬ
      const filtered = onDutaionFilter(filteredFilms, isChecked);
      setRenderedMoviesFilms(filtered);
      const lastSearchData = {
        text: values.filmName,
        isCheckedFilter: isChecked,
      };
      localStorage.setItem("lastSearchData", JSON.stringify(lastSearchData));
      setSearching(true);
      // const durationFiltredFilms = onDutaionFilter(getFilmsArray, isChecked);
      // console.log(durationFiltredFilms);
      // setRenderedMoviesFilms(getFilmsArray);
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
      <FilterCheckbox setIsChecked={setIsChecked} isChecked={isChecked} />
    </section>
  );
}

export default SearchForm;
