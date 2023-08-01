import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies() {
    return (
        <div className='main'>
          <SearchForm />
          <MoviesCardList />
          <Preloader />
        </div>
    );
}

export default Movies;