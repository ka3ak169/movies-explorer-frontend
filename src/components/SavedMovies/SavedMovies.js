import React from "react";
import SearchFormSave from "../SearchFormSave/SearchFormSave";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";


function SavedMovies({
  location,
  savedFilms,
  onDelFilm,
  onGetFilms,
  isCheckedSaved,
  setIsCheckedSaved,
  onDutaionFilter,
  setRenderedSavesFilms,
  films,
  saveToFilms,
  setSavedToFilms,
  nomatches,
  setNomatches,
  searching,
  preloaderHidden,
  onPreloader,
  setSearching,
  isLoading,
  onResize,
  setSavedFilms
}) {

  return (
    <main className="main">
      <SearchFormSave
        location={location}
        onGetFilms={onGetFilms}
        savedFilms={savedFilms}
        isCheckedSaved={isCheckedSaved}
        setIsCheckedSaved={setIsCheckedSaved}
        onDutaionFilter={onDutaionFilter}
        setRenderedSavesFilms={setRenderedSavesFilms}
        setSavedToFilms={setSavedToFilms}
        setNomatches={setNomatches}
        setSearching={setSearching}
        onResize={onResize}        
      />
      <MoviesCardList
        location={location}
        films={films}
        savedFilms={savedFilms}
        onDelFilm={onDelFilm}
        saveToFilms={saveToFilms}
        setSavedToFilms={setSavedToFilms}
      />
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

export default SavedMovies;
