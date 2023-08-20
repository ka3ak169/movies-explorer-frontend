import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { movieApiPart } from "../../utils/utils";



function MoviesCard({ location, film, onAddFilm, onDelFilm, filmsToRender, savedFilms, onInitialFilm }) {
  const [cardIsActive, setCardIsActive] = useState(false);
  // console.log(onInitialFilm);
  // console.log(film);
  // console.log(savedFilms);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (filmsToRender && savedFilms) {
      filmsToRender.forEach((item) => {
        if (item.id === film.id) {
          savedFilms.forEach((savedFilm) => {
            if (item.id === savedFilm.movieId) {
              setCardIsActive(true);
            }
          });
        }
      });
    }
  }, [filmsToRender, savedFilms, film.id]) // Добавляем film.id в зависимости

  
  
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} час ${remainingMinutes} минут`;
  }

  function handleFavoriteSubmit() {
    console.log("FAVORITE");
    setCardIsActive(!cardIsActive);
    // console.log(film._id);
    onAddFilm(film, currentUser._id);
    onInitialFilm();
  }

  function handleDeleteSubmit() {
    console.log("DELETE");
      // Найти элемент в savedFilms, у которого movieId совпадает с film.id
      const savedFilm = savedFilms.find(savedFilm => savedFilm.movieId === film.id);
    if (savedFilm) { // Проверка на случай, если совпадение не найдено
      console.log(savedFilm._id); // Вывести _id найденного элемента
      onDelFilm(savedFilm._id)
      .then((result) => {
        console.log(result);
        setCardIsActive(false);
        onInitialFilm();
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);  
      });
    } else {
      console.log('Film not found in savedFilms');
    }
  }

  function handleDeleteFavoriteSubmit() {
    console.log("DELETE FAVORITE");
    console.log(film._id);
    onDelFilm(film._id)
      .then((result) => {
        console.log(result);
        onInitialFilm();
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);  
      });
  }

  function handleClick() {
    if(!cardIsActive) {
      handleFavoriteSubmit()
    } else {
      handleDeleteSubmit()
    }
  }

  useEffect(() => {
    if (location === 'saved') {
      setCardIsActive(false); 
    }
  }, [location]);

  return (

    <div className="moviesCard">
      <Link
        className="moviesCard__trailerLink"
        target="_blank"
        to={film.trailerLink}
      >
        <img
          className="moviesCard__img"
          src={location === 'saved' ? film.image : movieApiPart + film.image.url}
          // src={film.image}
          alt="Картинка"
        />
      </Link>
      <div className="moviesCard__container">
        <div className="moviesCard__description">
          <h2 className="moviesCard__name">{film.nameRU}</h2>
          <p className="moviesCard__duration">
            {formatDuration(film.duration)}
          </p>
        </div>

        <button
          className={`moviesCard__button ${
            cardIsActive ? "moviesCard__button_active" : ""
          } ${location === "saved" ? "moviesCard__button_delete" : ""} `}
          onClick={location === 'saved' ? handleDeleteFavoriteSubmit : handleClick}
        />
      </div>
    </div>
  );
}

export default MoviesCard;
