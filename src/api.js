import { data } from "autoprefixer";

export const PATH = 'https://mesto.nomoreparties.co/v1/wff-cohort-21';

fetch (`${PATH}/cards`, {
  headers: {
    authorization: 'ea2f954f-c019-4b51-8f37-b84bd838696f'
  },
  method: 'GET'
})
.then((res) => {
  if (res.ok) {
    return res.json()
  }
})
.then((data) => {
  // const ArrayCards = [];
  const newArrayCards = data.map((item) => {
    return item;
  })
  // console.log(newArrayCards);
  // for(let i = 0; length.i; i++) {
  //   return newArrayCards[i];
  // }
  console.log(newArrayCards)
})

// console.log(newArrayCards)

