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

import { enableValidation, clearValidation } from "./validation.js";

import "../pages/index.css";

import { openPopup, closePopup } from "./modal.js";

let userProfile = null;

// настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input__error",
  errorClass: "popup__error_visible",
};

// Профиль
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileAddNewPlace = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");

// popup место
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupNewPlaceCloseBtn = popupNewPlace.querySelector(".popup__close");
const formNewPlace = document.querySelector("#form__place");

// popup профиль
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileCloseBtn = popupProfile.querySelector(".popup__close");
const formEditProfile = document.querySelector("#form__profile");

// popup аватар
const popupAvatarEdit = document.querySelector(".popup_type_edit_avatar");
const popupAvatarEditCloseBtn = popupAvatarEdit.querySelector(".popup__close");
const formEditAvatar = popupAvatarEdit.querySelector(".popup__form");

// popup картинка
const popupCard = document.querySelector(".popup_type_image");
const popupCardCloseBtn = popupCard.querySelector(".popup__close");
const popupCardContentImg = popupCard.querySelector(".popup__image");
const popupCardContentTxt = popupCard.querySelector(".popup__caption");

// все popups
const popups = Array.from(document.querySelectorAll(".popup"));

// настройка popup "добавления карточек"
profileAddNewPlace.addEventListener("click", (evt) => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupNewPlace);
});

popupNewPlaceCloseBtn.addEventListener("click", () => 
  closePopup(popupNewPlace)
);

popupNewPlace.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupNewPlace);
  }
});

//настройка popup профиля

profileEditBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;

  clearValidation(formEditProfile, validationConfig);

  openPopup(popupProfile);
});

popupProfileCloseBtn.addEventListener("click", () => 
  closePopup(popupProfile)
);

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  formEditProfile.elements.submit.textContent = "Сохранение...";

  editProfile({
    name: formEditProfile.elements.name.value,
    about: formEditProfile.elements.description.value,
  })
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;

      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => 
      formEditProfile.elements.submit.textContent = "Сохранить"
    );
});

popupProfile.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupProfile);
  }
});

// функция добавления класса "popup_is-animated" для плавного открытия popup в дальнейшем
popups.forEach((popup) => popup.classList.add("popup_is-animated"));

// @todo: Вывести карточки на страницу
Promise.all([getAllCards(), loadProfilInformation()])
  .then(([cardsData, profileData]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style = "background-image: url('" + profileData.avatar + "')";

    userProfile = profileData;
    cardsContainer.innerHTML = "";
    cardsData.forEach((element) => createAndAddCardEnd(element, profileData._id));
  })
  .catch((err) => console.log(err));

//добавление обработчика отправки нового места в форме
formNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  formNewPlace.elements.submit.textContent = "Сохранение...";

  const cardData = {
    name: formNewPlace.elements.placename.value,
    link: formNewPlace.elements.link.value,
  };

  createCardApi(cardData)
    .then((cardData) => {
      createAndAddCard(cardData, userProfile._id, openCardPopap);
      closePopup(popupNewPlace);
    })
    .catch((err) => console.log(err))
    .finally(() => 
      formNewPlace.elements.submit.textContent = "Сохранить"
    );
});

// настройка изображения всплывающей карточки
popupCard.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupCard);
  }
});

popupCardCloseBtn.addEventListener("click", () => closePopup(popupCard));

// настройка всплывающего окна редактирования аватара

profileImage.addEventListener("click", (evt) => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupAvatarEdit);
});

popupAvatarEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();

  formEditAvatar.elements.submit.textContent = "Сохранение...";

  const avatarData = {
    avatar: formEditAvatar.elements.link.value,
  };

  updateAvatar(avatarData)
    .then((data) => {
      profileImage.style = `background-image: url('${data.avatar}')`;
      closePopup(popupAvatarEdit);
    })
    .catch((err) => console.log(err))
    .finally(() =>
      formEditAvatar.elements.submit.textContent = "Сохранить"
    );
});

popupAvatarEditCloseBtn.addEventListener("click", () => closePopup(popupAvatarEdit));

popupAvatarEdit.addEventListener("click", (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(popupAvatarEdit);
  }
});

enableValidation(validationConfig);

// создание и добавление в начало
function createAndAddCard(cardData, profileId) {
  const card = createCard(
    cardData,
    profileId,
    deleteCard,
    callingLike,
    openCardPopap
  );
  cardsContainer.prepend(card);
}

// создание и добавление в конец
function createAndAddCardEnd(cardData, profileId) {
  const card = createCard(
    cardData,
    profileId,
    deleteCard,
    callingLike,
    openCardPopap
  );
  cardsContainer.append(card);
}

function openCardPopap(cardData) {
  popupCardContentImg.src = cardData.link;
  popupCardContentImg.alt = cardData.name;
  popupCardContentTxt.textContent = cardData.name;

  openPopup(popupCard);
}