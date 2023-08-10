import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({location}) {
    return (
        <main className='main'>
          <SearchForm />
          <MoviesCardList location={location}/>
        </main>
    );
}

export default SavedMovies;