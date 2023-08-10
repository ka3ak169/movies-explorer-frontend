import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies() {
    return (
        <main className='main'>
          <SearchForm />
          <MoviesCardList />
          <Preloader />
        </main>
    );
}

export default Movies;