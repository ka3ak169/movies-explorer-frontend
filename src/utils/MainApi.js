import apiUrl from './utils';

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



