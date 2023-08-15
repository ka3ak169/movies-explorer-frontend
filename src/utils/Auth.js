import apiUrl from './utils';

const BASE_URL = apiUrl;

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      // Получаем текст ошибки из ответа сервера
      return response.json().then((data) => {
        throw new Error(data.message);
      });
    }
  })
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // Получаем текст ошибки из ответа сервера
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }
    })
};

