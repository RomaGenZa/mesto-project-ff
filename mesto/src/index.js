// импорт главного файла стилей
import "../pages/index.css";

// импорт popup настройки профиля
import { configureProfileEditPopup } from "./configureProfileEditPopup";
configureProfileEditPopup();

// импорт popup настройки карточек
import { configureCardsEditPopup } from "./configureCardsEditPopup";
// import {smoothOpeningPopup} from './smoothOpeningPopup';
configureCardsEditPopup();

// импорт обработчика закрытия popup (профиль, доб. карт., карточка) по клавише «Escape»
import { OnEscPressedHandler } from "./OnEscPressedHandler.js";

// импорт нового массива с добавленными карточками
import { allCards } from "./configureCardsEditPopup.js";

//
import { callingLike } from "./callingLike.js";

// импорт функции присвоения классов для плавного закрытия popup
import { smoothClosingPopups } from "./smoothClosingPopups";

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");

// экспорт функции выведения карточки на страницу
export { addCards };

export {createAndAddCard};

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// функция добавления класса "popup_is-animated" для плавного открытия popup в дальнейшем
function addClassPopupOpen() {
  const popups = [
    document.querySelector(".popup_type_edit"),
    document.querySelector(".popup_type_new-card"),
    document.querySelector(".popup_type_image"),
  ];
  popups.forEach(function (popup) {
    popup.classList.add("popup_is-animated");
  });
}
addClassPopupOpen();

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
      // popCard.style.display = "none";
      smoothClosingPopups(popCard);
    });

    const contentImg = popCard.querySelector(".popup__image");
    contentImg.src = cardData.link;
    contentImg.alt = cardData.name;

    const contentTxt = popCard.querySelector(".popup__caption");
    contentTxt.textContent = cardData.name;

    // popCard.style.display = "flex";
    popCard.classList.add("popup_is-opened");
    document.addEventListener("keydown", OnEscPressedHandler);

    const popupImg = document.querySelector(".popup__content_content_image");
    popCard.addEventListener("click", function (evt) {
      if (!popupImg.contains(evt.target)) {
        // popCard.style.display = "none";
        smoothClosingPopups(popCard);
      }
    });
  });
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
  
  const element = {
    name: cardElement.querySelector(".card__title").textContent,
    link: cardElement.querySelector(".card__image").src,
  };
  console.log(element);
  allCards.shift(element);
  console.log(allCards);
}

function createAndAddCard(cardData) {
  const card = createCard(cardData, deleteCard, callingLike);
  cardsContainer.prepend(card);
}

function createAndAddCardEnd(cardData) {
  const card = createCard(cardData, deleteCard, callingLike);
  cardsContainer.append(card);
}

// @todo: Вывести карточки на страницу
function addCards() {
  cardsContainer.innerHTML = "";
  allCards.forEach(createAndAddCardEnd);
}
addCards();

import icon from "../images/add-icon.svg";
import avatar from "../images/avatar.jpg";
import card_1 from "../images/card_1.jpg";
import card_2 from "../images/card_2.jpg";
import card_3 from "../images/card_3.jpg";
import close from "../images/close.svg";
import del from "../images/delete-icon.svg";
import edit from "../images/edit-icon.svg";
import active from "../images/like-active.svg";
import inactive from "../images/like-inactive.svg";
import logo from "../images/logo.svg";

const pictures = [
  { name: "icon", link: icon },
  { name: "avatar", link: avatar },
  { name: "card_1", link: card_1 },
  { name: "card_2", link: card_2 },
  { name: "card_3", link: card_3 },
  { name: "close", link: close },
  { name: "delete", link: del },
  { name: "edit", link: edit },
  { name: "active", link: active },
  { name: "inactive", link: inactive },
  { name: "logo", link: logo },
];
