// импорт обработчика закрытия popup (профиль, доб. карт., карточка) по клавише «Escape»
import { OnEscPressedHandler } from "./OnEscPressedHandler.js";

import { initialCards } from '../scripts/cards';

// функция лайка
import { callingLike } from "./callingLike.js";

// импорт функции присвоения классов для плавного закрытия popup
import { smoothClosingPopups } from "./smoothClosingPopups.js";

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания и закрытие карточки
function createCard(cardData, deleteCardCallback, likeCardCallback) {
  const cloneTemplate = template.cloneNode(true);
  cloneTemplate.querySelector(".card__image").src = cardData.link;
  cloneTemplate.querySelector(".card__image").alt = cardData.name;
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

  cardElement.addEventListener("click", function (evt) {
    if (basket.contains(evt.target) || btnLike.contains(evt.target)) {
      return;
    }
    const popCard = document.querySelector(".popup_type_image");

    const btnClose = popCard.querySelector(".popup__close");
    btnClose.addEventListener("click", function () {
      smoothClosingPopups(popCard);
    });

    const contentImg = popCard.querySelector(".popup__image");
    contentImg.src = cardData.link;
    contentImg.alt = cardData.name;

    const contentTxt = popCard.querySelector(".popup__caption");
    contentTxt.textContent = cardData.name;

    popCard.classList.add("popup_is-opened");
    document.addEventListener("keydown", OnEscPressedHandler);

    const popupImg = document.querySelector(".popup__content_content_image");
    popCard.addEventListener("click", function (evt) {
      if (!popupImg.contains(evt.target)) {
        smoothClosingPopups(popCard);
      }
    });
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

// экспорт функции выведения карточки на страницу
export { addCards };

// экспорт функции добавления и удаления карточки
export {createAndAddCard};