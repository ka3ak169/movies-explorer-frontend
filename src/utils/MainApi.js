import apiUrl from './utils';
import { movieApiPart } from './utils';

const getHeaders = () => {
  const storedToken = localStorage.getItem("token");
  let token;
  if (storedToken && storedToken !== "null" && storedToken !== "undefined") {
    token = JSON.parse(storedToken);
  }

  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : undefined
  };
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

// получаем информацию 
export const getUserInformation = () => {
  return fetch(`${apiUrl}/users/me`, {
    headers: getHeaders() // Используем функцию для получения актуальных заголовков
  })
  .then(checkResponse)
  .then(data => {
    return data; 
  });
};

// меняем информацию
export const changeUserInformation = (data) => {
  return fetch(`${apiUrl}/users/me`, {
    method: 'PATCH',
    headers: getHeaders(), // Используем функцию для получения актуальных заголовков
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  })
  .then(checkResponse);
}

// добавляем в избранное
export const postFavoriteMovies = (data, owner) => {

  return fetch(`${apiUrl}/movies`, {
    method: 'POST',
    headers: getHeaders(), // Используем функцию для получения актуальных заголовков
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: movieApiPart + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: movieApiPart + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
      owner: owner
    })
  })
  .then(checkResponse);
}

// удаляем лайкнутые
export const deleteFavoriteMovies = (movieId) => {
  return fetch(`${apiUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: getHeaders() // Используем функцию для получения актуальных заголовков
  })
  .then(checkResponse);
}

// получаем свои фильмы
export const getInitialFilms = () => {
  return fetch(`${apiUrl}/movies`, {
    method: 'GET',
    headers: getHeaders() // Используем функцию для получения актуальных заголовков
  })
  .then(checkResponse);
};