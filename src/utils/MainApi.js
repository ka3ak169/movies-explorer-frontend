import apiUrl from './utils';
import { movieApiPart } from './utils';


// Создание объекта headers с заголовками запроса
const headers = {
  "Content-Type": "application/json",
};

// Получение токена из localStorage
const storedToken = localStorage.getItem("token");

// Если в localStorage есть токен, добавляем его в заголовки
if (storedToken && storedToken !== "null" && storedToken !== "undefined") {
  const token = JSON.parse(storedToken);
  headers.authorization = `Bearer ${token}`;
} else {
  console.log('Token не существует');
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

export const getUserInformation = () => {
  return fetch(`${apiUrl}/users/me`, {
    headers: headers
  })
  .then(checkResponse)
  .then(data => {
    return data; // Возвращаем результат для дальнейшей обработки
  });
}

export const changeUserInformation = (data) => {
  return fetch(`${apiUrl}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: data.name,
      email: data.email
    })
  })
  .then(checkResponse);
}

export const postFavoriteMovies = (data, owner) => {
  console.log(data);
  console.log(movieApiPart + data.image.url);
  return fetch(`${apiUrl}/movies`, {
    method: 'POST',
    headers: headers,
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

export const deleteFavoriteMovies = (movieId) => {
  return fetch(`${apiUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers: headers 
  })
  .then(checkResponse);
}

export const getInitialFilms = () => {
  return fetch(`${apiUrl}/movies`, {
    method: 'GET', 
    headers: headers 
  })
  .then(checkResponse);
}




