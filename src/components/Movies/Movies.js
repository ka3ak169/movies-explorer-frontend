import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  onGetFilms,
  films,
  searching,
  nomatches,
  setIsLoading,
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
  filteredFilms,
  allFilms,
  onDutaionFilter,
  setRenderedMoviesFilms,
  setFilteredFilms,
  setSearching
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
        filteredFilms={filteredFilms}
        allFilms={allFilms}
        onDutaionFilter={onDutaionFilter}
        setRenderedMoviesFilms={setRenderedMoviesFilms}
        setFilteredFilms={setFilteredFilms}
        setSearching={setSearching}
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
