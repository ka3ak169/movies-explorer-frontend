import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  location,
  savedFilms,
  onDelFilm,
  onInitialFilm,
  onGetFilms,
  setIsLoading,
  setIsChecked,
  isChecked,
  lastSearchText, 
  isLoading
}) {

  return (
    <main className="main">
      <SearchForm
        onGetFilms={onGetFilms}
        setIsLoading={setIsLoading}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        lastSearchText={lastSearchText}
        isLoading={isLoading}
      />
      <MoviesCardList
        location={location}
        films={savedFilms}
        savedFilms={savedFilms}
        onDelFilm={onDelFilm}
        onInitialFilm={onInitialFilm}
      />
    </main>
  );
}

export default SavedMovies;
