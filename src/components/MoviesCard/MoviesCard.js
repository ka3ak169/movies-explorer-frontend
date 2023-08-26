import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { movieApiPart } from "../../utils/utils";

function MoviesCard({
  location,
  film,
  onAddFilm,
  onDelFilm,
  filmsToRender,
  savedFilms,
  onInitialFilm,
  setSavedToFilms,
  saveToFilms,
}) {
  const [cardIsActive, setCardIsActive] = useState(false);
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
  }, [filmsToRender, savedFilms, film.id, saveToFilms]);

  useEffect(() => {

    setCardIsActive(cardIsActive)
  }, [saveToFilms]); 

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} час ${remainingMinutes} минут`;
  }

  function handleFavoriteSubmit() {
    onAddFilm(film, currentUser._id)
      .then((data) => {
        setCardIsActive(!cardIsActive);
        setSavedToFilms((prevFilms) => [
          ...prevFilms,
          data.movie
        ]);
        setCardIsActive(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  function handleDeleteSubmit() {
    // Найти элемент в savedFilms, у которого movieId совпадает с film.id
    const savedFilm = savedFilms.find(
      (savedFilm) => savedFilm.movieId === film.id
    );
    if (savedFilm) {
      // Проверка на случай, если совпадение не найдено
      onDelFilm(savedFilm._id)
        .then((result) => {
          setCardIsActive(false);
          setSavedToFilms((prevFilms) =>
          prevFilms.filter((f) => f._id !== savedFilm._id));
          setCardIsActive(false);          
        })
        .catch((error) => {
          // Обработка ошибки
          console.log(error);
        });
    } else {
      console.log("Film not found in savedFilms");
    }
  }

  function handleDeleteFavoriteSubmit() {
    onDelFilm(film._id)
      .then((result) => {
        console.log(result._id);
        setSavedToFilms((prevFilms) =>
          prevFilms.filter((f) => f._id !== film._id)
        );
      })
      .catch((error) => {
        // Обработка ошибки
        console.log(error);
      });
  }

  function handleClick() {
    if (!cardIsActive) {
      handleFavoriteSubmit();
    } else {
      handleDeleteSubmit();
    }
  }

  useEffect(() => {
    if (location === "saved") {
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
          src={
            location === "saved" ? film.image : movieApiPart + film.image.url
          }
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
          onClick={
            location === "saved" ? handleDeleteFavoriteSubmit : handleClick
          }
        />
      </div>
    </div>
  );
}

export default MoviesCard;
