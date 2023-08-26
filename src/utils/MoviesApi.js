import { movieApiUrl } from './utils';

// Создание объекта headers с заголовками запроса
const headers = {
  "Content-Type": "application/json",
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

export const getAllFilms = () => {
  return fetch(`${movieApiUrl}`, {
    headers: headers
  })
  .then(checkResponse)
  .then(data => {
    return data; // Возвращаем результат для дальнейшей обработки
  });
}