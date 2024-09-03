import { pencil_img } from "../images/pencil.svg";
import { logo_img } from "../images/logo.svg";
import { cardsContainer, deleteCard, callingLike, createCard } from "./card.js";

import {
  getAllCards,
  createCard as createCardApi,
  loadProfilInformation,
  editProfile,
  updateAvatar,
} from "./api.js";

import { enableValidation, validationConfig } from "./validation.js";

import "../pages/index.css";

import { closePopupByOverlay, openPopup, closePopup } from "./modal.js";

// функционал
loadProfilInformation()
  .then((profileData) => {
    document.querySelector(".profile__title").textContent = profileData.name;
    document.querySelector(".profile__description").textContent =
      profileData.about;
    document.querySelector(".profile__image").style =
      "background-image: url('" + profileData.avatar + "')";
  })
  .catch((err) => console.log(err));

// настройка popup "добавления карточек"
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

configureProfileEditPopup();
animatedClassPopupOpen();
addCards(openCardPopap);
addFormNewPlaceSubmitHandler(openCardPopap);
configurePopupCardImage();
configureAvatarEditPopup();

enableValidation(validationConfig);

function configurePopupCardImage() {
  const popCard = document.querySelector(".popup_type_image");
  const btnClose = popCard.querySelector(".popup__close");
  popCard.addEventListener("click", closePopupByOverlay);
  btnClose.addEventListener("click", function () {
    closePopup(popCard);
  });
}

// создание и добавление в начало
function createAndAddCard(cardData, profileId, openCardPopapCallback) {
  const card = createCard(
    cardData,
    profileId,
    deleteCard,
    callingLike,
    openCardPopapCallback
  );
  cardsContainer.prepend(card);
}

// создание и добавление в конец
function createAndAddCardEnd(cardData, profileId, openCardPopapCallback) {
  const card = createCard(
    cardData,
    profileId,
    deleteCard,
    callingLike,
    openCardPopapCallback
  );
  cardsContainer.append(card);
}

// заполнениение данных popup "профиля"
function fillProfileForm() {
  const formEditProfile = document.forms["edit-profile"];

  const inputName = formEditProfile.elements.name;
  inputName.value = document.querySelector('.profile__title').textContent;
  
  const inputDescription = formEditProfile.elements.description;
  inputDescription.value = document.querySelector('.profile__description').textContent;
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
    const btnSavePopup = formEditProfile.querySelector(".popup__button");
    btnSavePopup.textContent = "Сохранение...";
    editProfile({
      name: inputName.value,
      about: inputDescription.value,
    })
      .then((profile) => {
        document.querySelector(".profile__title").textContent = profile.name;
        document.querySelector(".profile__description").textContent =
          profile.about;
        closePopup(popupProfile);
      })
      .catch((err) => console.log(err))
      .finally (() => {
        btnSavePopup.textContent = "Сохранить";
      })
  });

  popupProfile.addEventListener("click", closePopupByOverlay);
}

function configureAvatarEditPopup() {
  const openEditAvatar = document.querySelector(".profile__image");
  const popupAvatarEdit = document.querySelector(".popup_type_edit_avatar");
  const btnClosePopup = popupAvatarEdit.querySelector(".popup__close");

  openEditAvatar.addEventListener("click", function (evt) {
    popupAvatarEdit.querySelector(".popup__form").reset();
    openPopup(popupAvatarEdit);
  });

  popupAvatarEdit.addEventListener("submit", function (evt) {
    const inputPlaceLink = popupAvatarEdit.querySelector("#url__input");
    const btnSave = popupAvatarEdit.querySelector(".popup__button");
    btnSave.textContent = "Сохранение...";
    evt.preventDefault();
    const avatarData = {
      avatar: inputPlaceLink.value,
    };

    updateAvatar(avatarData)
      .then((data) => {
        if (data !== null) {
          document.querySelector(".profile__image").style =
            "background-image: url('" + data.avatar + "')";
          closePopup(popupAvatarEdit);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnSave.textContent = "Сохранить";
      })
  });

  btnClosePopup.addEventListener("click", function () {
    closePopup(popupAvatarEdit);
  });

  popupAvatarEdit.addEventListener("click", closePopupByOverlay);
}

// функция добавления класса "popup_is-animated" для плавного открытия popup в дальнейшем
function animatedClassPopupOpen() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach(function (popup) {
    popup.classList.add("popup_is-animated");
  });
}

function addFormNewPlaceSubmitHandler(openCardPopapCallback) {
  const formNewPlace = document.forms["new-place"];

  formNewPlace.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const inputPlaceName = formNewPlace.elements["place-name"];
    const inputPlaceLink = formNewPlace.elements.link;
    const popupNewPlace = document.querySelector(".popup_type_new-card");
    const btnSave = formNewPlace.querySelector(".popup__button");
    btnSave.textContent = "Сохранение...";
    const cardData = {
      name: inputPlaceName.value,
      link: inputPlaceLink.value,
    };

    Promise.all([createCardApi(cardData), loadProfilInformation()])
      .then((data) => {
        const cardData = data[0];
        const profileData = data[1];
        createAndAddCard(cardData, profileData._id, openCardPopapCallback);
        closePopup(popupNewPlace);
      })
      .catch((err) => console.log(err))
      .finally (() => {
        btnSave.textContent = "Сохранить";
      })
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
  Promise.all([getAllCards(), loadProfilInformation()])
    .then(([cardsData, profileData]) => {
      cardsContainer.innerHTML = "";
      cardsData.forEach(function (element) {
        createAndAddCardEnd(element, profileData._id, openCardPopapCallback);
      });
    })
    .catch((err) => console.log(err));
}

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");

export { openCardPopap };
