// import { data } from "autoprefixer";

export const link = "https://nomoreparties.co/v1/wff-cohort-21/";

const token = {
  authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
}

const handleResonse = (res) => {
  if (res.ok) {
    return res.json();
  }
};


export function getAllCards() {
  return fetch(`${link}cards`, {
    headers: {
      authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
    },
    method: "GET",
  }).then(handleResonse);
}


export function createCard(data) {
  return fetch(`${link}cards`, {
    headers: {
      authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(handleResonse);
}


export function loadProfilInformation() {
  return fetch(`${link}users/me`, {
    headers: {
      authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
    },
    method: "GET",
  })
    .then(handleResonse)
}



export function editProfile(data) {
  return fetch(`${link}users/me`, {
    method: "PATCH",
    headers: {
      authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResonse)
}

