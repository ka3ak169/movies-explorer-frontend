import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  onGetFilms,
  films,
  searching,
  isLoading,
  searchError,
  setIsChecked,
  isChecked,
  rowsToShow,
  filmsToRender,
  preloaderHidden,
  onPreloader,
  onAddFilm,
  onDelFilm,
  savedFilms,
  onInitialFilm,
  lastSearchText,
  allFilms,
  onDutaionFilter,
  setRenderedMoviesFilms,
  setSearching,
  filmsToMovies,
  setFilmsToMovies,
  setNomatches,
  nomatches
}) {

  return (
    <main className="main">
      <SearchForm
        onGetFilms={onGetFilms}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        lastSearchText={lastSearchText}
        isLoading={isLoading}
        allFilms={allFilms}
        onDutaionFilter={onDutaionFilter}
        setRenderedMoviesFilms={setRenderedMoviesFilms}
        setSearching={setSearching}
        filmsToMovies={filmsToMovies}
        setFilmsToMovies={setFilmsToMovies}
        setNomatches={setNomatches}
      />
      {searching && !nomatches && (
        <MoviesCardList
          films={films}
          searchError={searchError}
          rowsToShow={rowsToShow}
          onAddFilm={onAddFilm}
          onDelFilm={onDelFilm}
          filmsToRender={filmsToRender}
          savedFilms={savedFilms}
          onInitialFilm={onInitialFilm}
        />
      )}
      <Preloader
        isLoading={isLoading}
        nomatches={nomatches}
        searching={searching}
        preloaderHidden={preloaderHidden}
        onPreloader={onPreloader}
      />
    </main>
  );
}

export default Movies;
