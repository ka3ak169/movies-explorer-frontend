import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ onGetFilms }) {
    return (
        <main className='main'>
          <SearchForm
            onGetFilms={onGetFilms}
          />
          <MoviesCardList />
          <Preloader />
        </main>
    );
}

export default Movies;