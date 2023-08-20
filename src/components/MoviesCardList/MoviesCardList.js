import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  location,
  films,
  searchError,
  onAddFilm,
  onDelFilm,
  filmsToRender,
  savedFilms,
  onInitialFilm
}) {
  // console.log(onInitialFilm);
  if (searchError) {
    return (
      <section className="moviesCardList" style={{ display: "flex" }}>
        <p className="moviesCardList__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      </section>
    );
  } else {
    return (
      <section className="moviesCardList">
        {films.map((film) => (
          <MoviesCard
            key={film._id || film.id}
            film={film}
            location={location}
            onAddFilm={onAddFilm}
            onDelFilm={onDelFilm}
            filmsToRender={filmsToRender}
            savedFilms={savedFilms}
            onInitialFilm={onInitialFilm}
          />
        ))}
      </section>
    );
  }
}

export default MoviesCardList;
