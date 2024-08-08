import { cardsContainer } from './index';

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция создания и закрытие карточки
function createCard(cardData, deleteCardCallback, likeCardCallback, openCardPopapCallback) {
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
    openCardPopapCallback(cardData);
  });
  return cloneTemplate;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// создание и добавление в начало
function createAndAddCard(cardData, openCardPopapCallback) {
  const card = createCard(cardData, deleteCard, callingLike, openCardPopapCallback);
  cardsContainer.prepend(card);
}

// создание и добавление в конец
function createAndAddCardEnd(cardData, openCardPopapCallback) {
  const card = createCard(cardData, deleteCard, callingLike, openCardPopapCallback);
  cardsContainer.append(card);
}

// функция лайка
function callingLike(element) {
  const btnLike = element.querySelector(".card__like-button");
  btnLike.classList.toggle('card__like-button_is-active');
}

export { createAndAddCardEnd };

export { createAndAddCard };

export { callingLike };