import {
  getAllCards,
  createCard,
  loadProfilInformation,
  editProfile,
} from "./api.js";

import { enableValidation, validationConfig } from "./validation.js";

import "../pages/index.css";

import { closePopupByOverlay, openPopup, closePopup } from "./modal.js";

import { createAndAddCardEnd, createAndAddCard } from "./card.js";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// функционал
setupProfileInformation();
configureCardsEditPopup();
configureProfileEditPopup();
animatedClassPopupOpen();
addCards(openCardPopap);
addFormNewPlaceSubmitHandler(openCardPopap);
configurePopupCardImage();

enableValidation(validationConfig);

function setupProfileInformation() {
  loadProfilInformation().then((profileData) => {
    document.querySelector(".profile__title").textContent = profileData.name;
    document.querySelector(".profile__description").textContent =
      profileData.about;
    document.querySelector(".profile__image").style =
      "background-image: url('" + profileData.avatar + "')";
  });
}

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
  loadProfilInformation().then((profileData) => {
    const inputName = formEditProfile.elements.name;
    inputName.value = profileData.name;

    const inputDescription = formEditProfile.elements.description;
    inputDescription.value = profileData.about;
  });
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
    editProfile({
      name: inputName.value,
      about: inputDescription.value,
    }).then((profile) => {
      document.querySelector(".profile__title").textContent = profile.name;
      document.querySelector(".profile__description").textContent = profile.about;
      closePopup(popupProfile);
    });
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

    createCard(cardData).then((data) => {
      createAndAddCard(data, openCardPopapCallback);
      closePopup(popupNewPlace);
    });
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
  getAllCards().then((data) => {
    cardsContainer.innerHTML = "";
    data.forEach(function (element) {
      createAndAddCardEnd(element, openCardPopapCallback);
    });
  });
}

export { cardsContainer };

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");

export { openCardPopap };
