// импорт обработчика закрытия popup (профиль, доб. карт., карточка) по клавише «Escape»
import { onEscPressedHandler } from "./modal.js";

import { initialCards } from '../scripts/cards';

// импорт функции присвоения классов для плавного закрытия popup
import { closePopup } from "./modal.js";

import { openCardPopap } from './index.js'

const popupNewPlace = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms['new-place'];

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания и закрытие карточки
function createCard(cardData, deleteCardCallback, likeCardCallback) {
  const cloneTemplate = template.cloneNode(true);
  const cardImg = cloneTemplate.querySelector(".card__image");
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cloneTemplate.querySelector(".card__title").textContent = cardData.name;
  const cardElement = cloneTemplate.querySelector(".places__item");

  const basket = cloneTemplate.querySelector(".card__delete-button");
  basket.addEventListener("click", function () {
    deleteCardCallback(cardElement);
  });

  const btnLike = cloneTemplate.querySelector(".card__like-button");
  btnLike.addEventListener("click", function () {
    likeCardCallback(cardElement);
  });

  cardImg.addEventListener("click", function(evt) {
    openCardPopap(cardData);
  });
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// создание и добавление в начало
function createAndAddCard(cardData) {
  const card = createCard(cardData, deleteCard, callingLike);
  cardsContainer.prepend(card);
}

// создание и добавление в конец
function createAndAddCardEnd(cardData) {
  const card = createCard(cardData, deleteCard, callingLike);
  cardsContainer.append(card);
}

// @todo: Вывести карточки на страницу
function addCards() {
  cardsContainer.innerHTML = "";
  initialCards.forEach(createAndAddCardEnd);
}

// добавление карточек 
formNewPlace.addEventListener('submit', function(evt) {
  const inputPlaceName = formNewPlace.elements['place-name'];
  const inputPlaceLink = formNewPlace.elements.link;
  evt.preventDefault();
  const cardData = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };
  
  createAndAddCard(cardData);

  closePopup(popupNewPlace);
})

// конфигурация popup "добавление новых карточек" 
function resetNewPlaceForm() {
  
  const inputPlaceName = formNewPlace.elements['place-name'];
  inputPlaceName.value = '';

  const inputPlaceLink = formNewPlace.elements.link;
  inputPlaceLink.value = '';
} 

// функция лайка
function callingLike(element) {
  const btnLike = element.querySelector(".card__like-button");
  btnLike.classList.toggle('card__like-button_is-active');
}

// экспорт функции выведения карточки на страницу
export { addCards };

// экспорт функции добавления и удаления карточки
export {createAndAddCard};

export {callingLike};
export {resetNewPlaceForm};