import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({location}) {
    return (
        <div className='main'>
          <SearchForm />
          <MoviesCardList location={location}/>
        </div>
    );
}

export default SavedMovies;