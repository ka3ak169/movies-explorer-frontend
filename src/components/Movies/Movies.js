import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ onGetFilms, films, searching, nomatches, setIsLoading, isLoading, searchError, setIsChecked, isChecked, rowsToShow, filmsToRender, preloaderHidden, onPreloader }) {
  // console.log(films);
  
  return (
    <main className='main'>
      <SearchForm
        onGetFilms={onGetFilms}
        setIsLoading={setIsLoading}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
      />
      {searching && !nomatches && <MoviesCardList
        films={films}
        searchError={searchError}
        rowsToShow={rowsToShow}
      />}
      <Preloader
        isLoading={isLoading}
        nomatches={nomatches}
        searching={searching}
        rowsToShow={rowsToShow}
        films={films}
        filmsToRender={filmsToRender}
        preloaderHidden={preloaderHidden}
        onPreloader={onPreloader}
      />
    </main>
  );
}

export default Movies;