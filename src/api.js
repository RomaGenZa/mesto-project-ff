import { data } from "autoprefixer";

// import { data } from "autoprefixer";
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const handleError = (err) => {
  console.log(err); 
};

export const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET"
  })
  .then(handleResponse)
  .catch(handleError);
}

export const createCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify(data),
  })
  .then(handleResponse)
  .catch(handleError);
}

export const loadProfilInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  })
  .then(handleResponse)
  .catch(handleError);
}

export const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(handleResponse)
  .catch(handleError);
}

export const deletePost = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
}

export const likeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
}

export const disLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleResponse)
  .catch(handleError);
}

export const updateAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(handleResponse)
  .catch(handleError);
}