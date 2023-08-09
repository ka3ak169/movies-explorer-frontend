import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
// import pic2 from '../../images/5f04b056ccd99.jpg';
// import pic3 from '../../images/Mad Max- Fury Road(1).jpg';
// import pic4 from '../../images/movies_02.jpg';

function MoviesCardList({location}) {
    return (
      <section className='moviesCardList'>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
        <MoviesCard location={location}/>
      </section>
    );
}

export default MoviesCardList;