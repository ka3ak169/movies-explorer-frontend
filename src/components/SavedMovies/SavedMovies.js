import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ location, savedFilms }) {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList location={location} films={savedFilms} />
    </main>
  );
}

export default SavedMovies;
