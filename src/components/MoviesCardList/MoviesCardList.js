import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
// import pic2 from '../../images/5f04b056ccd99.jpg';
// import pic3 from '../../images/Mad Max- Fury Road(1).jpg';
// import pic4 from '../../images/movies_02.jpg';

function MoviesCardList({ location, films, searchError }) {
  // console.log(films);
  if (searchError) {
    return (
      <section className="moviesCardList" style={{ display: "flex" }}>
        <p className="moviesCardList__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      </section>
    );
  } else {
    return (
      <section className="moviesCardList">
        {films.map((film) => (
          <MoviesCard key={film.id} film={film} location={location} />
        ))}
      </section>
    );
  }
}

export default MoviesCardList;
