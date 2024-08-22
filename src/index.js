import {watch} from './validation.js'
watch();

import "../pages/index.css";

import { initialCards } from "../scripts/cards";

import { closePopupByOverlay, openPopup, closePopup } from "./modal.js";

import { createAndAddCardEnd, createAndAddCard } from "./card.js";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// Объект с информацией профиля
const editingInformation = {
  name: "Жак-Ив Кусто",
  description: "Исследователь океана",
};

// функционал
configureCardsEditPopup();
configureProfileEditPopup();
animatedClassPopupOpen();
addCards(openCardPopap);
addFormNewPlaceSubmitHandler(openCardPopap);
configurePopupCardImage();

// настройка popup "добавления карточек"
function configureCardsEditPopup() {
  const buttonNewPlace = document.querySelector(".profile__add-button");
  const popupNewPlace = document.querySelector(".popup_type_new-card");
  const btnClosePopupNewPlace = popupNewPlace.querySelector(".popup__close");

  buttonNewPlace.addEventListener("click", function (evt) {
    popupNewPlace.querySelector(".popup__form").reset();
    openPopup(popupNewPlace);
  });

  btnClosePopupNewPlace.addEventListener("click", function () {
    closePopup(popupNewPlace);
  });

  popupNewPlace.addEventListener("click", closePopupByOverlay);
}

function configurePopupCardImage() {
  const popCard = document.querySelector(".popup_type_image");
  const btnClose = popCard.querySelector(".popup__close");
  popCard.addEventListener("click", closePopupByOverlay);
  btnClose.addEventListener("click", function () {
    closePopup(popCard);
  });
}

// заполнениение данных popup "профиля"
function fillProfileForm() {
  const formEditProfile = document.forms["edit-profile"];
  const evt = new Event('input');

  const inputName = formEditProfile.elements.name;
  inputName.value = editingInformation.name;
  inputName.dispatchEvent(evt);

  const inputDescription = formEditProfile.elements.description;
  inputDescription.value = editingInformation.description;
  inputDescription.dispatchEvent(evt);
}

//настройка popup редактирование "профиля"
function configureProfileEditPopup() {
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonProfile = document.querySelector(".profile__edit-button");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");
  const formEditProfile = document.forms["edit-profile"];

  buttonProfile.addEventListener("click", function (evt) {
    evt.preventDefault();
    openPopup(popupProfile);
    fillProfileForm();
  });

  buttonClosePopup.addEventListener("click", function () {
    closePopup(popupProfile);
  });

  formEditProfile.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const inputName = formEditProfile.elements.name;
    const inputDescription = formEditProfile.elements.description;
    editingInformation.name = inputName.value;
    editingInformation.description = inputDescription.value;
    closePopup(popupProfile);
    document.querySelector(".profile__title").textContent = inputName.value;
    document.querySelector(".profile__description").textContent =
      inputDescription.value;
  });

  popupProfile.addEventListener("click", closePopupByOverlay);
}

// функция добавления класса "popup_is-animated" для плавного открытия popup в дальнейшем
function animatedClassPopupOpen() {
  const popups = [
    document.querySelector(".popup_type_edit"),
    document.querySelector(".popup_type_new-card"),
    document.querySelector(".popup_type_image"),
  ];
  popups.forEach(function (popup) {
    popup.classList.add("popup_is-animated");
  });
}

function addFormNewPlaceSubmitHandler(openCardPopapCallback) {
  const formNewPlace = document.forms["new-place"];
  formNewPlace.addEventListener("submit", function (evt) {
    const inputPlaceName = formNewPlace.elements["place-name"];
    const inputPlaceLink = formNewPlace.elements.link;
    const popupNewPlace = document.querySelector(".popup_type_new-card");

    evt.preventDefault();
    const cardData = {
      name: inputPlaceName.value,
      link: inputPlaceLink.value,
    };

    createAndAddCard(cardData, openCardPopapCallback);

    closePopup(popupNewPlace);
  });
}

function openCardPopap(cardData) {
  const popCard = document.querySelector(".popup_type_image");

  const contentImg = popCard.querySelector(".popup__image");
  contentImg.src = cardData.link;
  contentImg.alt = cardData.name;

  const contentTxt = popCard.querySelector(".popup__caption");
  contentTxt.textContent = cardData.name;

  openPopup(popCard);
}

// @todo: Вывести карточки на страницу
function addCards(openCardPopapCallback) {
  cardsContainer.innerHTML = "";
  initialCards.forEach(function (element) {
    createAndAddCardEnd(element, openCardPopapCallback);
  });
}

export { cardsContainer };

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");

export { openCardPopap };
