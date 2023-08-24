import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchFormSave from "../SearchFormSave/SearchFormSave";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  location,
  savedFilms,
  setSavedFilms,
  onDelFilm,
  onInitialFilm,
  onGetFilms,
  isCheckedSaved,
  setIsCheckedSaved,
  setSavedFilteredFilms,
  savedFilteredFilms,
  onDutaionFilter,
  renderedSavesFilms,
  setRenderedSavesFilms,
  films,
  saveToFilms,
  setSavedToFilms,
  setIsLoading,
  setIsChecked,
  isChecked,
  lastSearchText,
  isLoading
}) {

  return (
    <main className="main">
      {/* <SearchForm
        onGetFilms={onGetFilms}
        setIsLoading={setIsLoading}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        lastSearchText={lastSearchText}
        isLoading={isLoading}
      /> */}
      <SearchFormSave
        location={location}
        onGetFilms={onGetFilms}
        savedFilms={savedFilms}
        setSavedFilms={setSavedFilms}
        isCheckedSaved={isCheckedSaved}
        setIsCheckedSaved={setIsCheckedSaved}
        setSavedFilteredFilms={setSavedFilteredFilms}
        savedFilteredFilms={savedFilteredFilms}
        onDutaionFilter={onDutaionFilter}
        renderedSavesFilms={renderedSavesFilms}
        setRenderedSavesFilms={setRenderedSavesFilms}
        onInitialFilm={onInitialFilm}
        saveToFilms={saveToFilms}
        setSavedToFilms={setSavedToFilms}
        // setIsLoading={setIsLoading}
        // setIsChecked={setIsChecked}
        // isChecked={isChecked}
        // lastSearchText={lastSearchText}
        // isLoading={isLoading}
      />
      <MoviesCardList
        location={location}
        films={films}
        savedFilms={savedFilms}
        onDelFilm={onDelFilm}
        saveToFilms={saveToFilms}
        setSavedToFilms={setSavedToFilms}
        // onInitialFilm={onInitialFilm}
      />
    </main>
  );
}

export default SavedMovies;
