import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  location,
  savedFilms,
  testfilms,
  onDelFilm,
  onInitialFilm,
  onGetFilms,
  setIsLoading,
  setIsChecked,
  isChecked
}) {
  // console.log(testfilms);
  // console.log(savedFilms);

  return (
    <main className="main">
      <SearchForm
        onGetFilms={onGetFilms}
        setIsLoading={setIsLoading}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
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
