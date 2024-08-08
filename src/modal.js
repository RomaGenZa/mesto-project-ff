import { createAndAddCard } from "./card.js";

const popupNewPlace = document.querySelector(".popup_type_new-card");
const formNewPlace = document.forms["new-place"];
const popupProfile = document.querySelector(".popup_type_edit");

// Объект с информацией профиля
const editingInformation = {
  name: "Жак-Ив Кусто",
  description: "Исследователь океана",
};

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

  const inputName = formEditProfile.elements.name;
  inputName.value = editingInformation.name;

  const inputDescription = formEditProfile.elements.description;
  inputDescription.value = editingInformation.description;
}

//настройка popup редактирование "профиля"
function configureProfileEditPopup() {
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

//закрытие popup клавишей Escape
function onEscPressedHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
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

// метод закрытия popup
function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscPressedHandler);
}

// метод открытия popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscPressedHandler);
}

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

function addFormNewPlaceSubmitHandler(openCardPopapCallback) {
  formNewPlace.addEventListener("submit", function (evt) {
    const inputPlaceName = formNewPlace.elements["place-name"];
    const inputPlaceLink = formNewPlace.elements.link;
    evt.preventDefault();
    const cardData = {
      name: inputPlaceName.value,
      link: inputPlaceLink.value,
    };

    createAndAddCard(cardData, openCardPopapCallback);

    closePopup(popupNewPlace);
  });
}

export {
  closePopup,
  animatedClassPopupOpen,
  onEscPressedHandler,
  configureProfileEditPopup,
  configureCardsEditPopup,
  addFormNewPlaceSubmitHandler,
  openPopup,
  closePopupByOverlay,
  configurePopupCardImage
};
