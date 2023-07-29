import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';


function Movies() {
    return (
        <main className='main'>
          <SearchForm />
          <MoviesCardList />
          <Preloader />
          <Footer />
        </main>
    );
}

export default Movies;