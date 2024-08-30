import { data } from "autoprefixer";

export const PATH = "https://mesto.nomoreparties.co/v1/wff-cohort-21";

function getAllCards() {
  fetch(`${PATH}/cards`, {
    headers: {
      authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
    },
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
    });
}

getAllCards();

function createCard() {
  fetch(`${PATH}/cards`, {
    headers: {
      authorization: "ea2f954f-c019-4b51-8f37-b84bd838696f",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "Циндао",
      link: "https://cameralabs.org/media/camera/july/22july/48_366d7b4946bfce955b67b9e638a7b6ec.jpg",
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
    });
}

createCard();
