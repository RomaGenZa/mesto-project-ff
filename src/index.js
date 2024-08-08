import "../pages/index.css";

import { initialCards } from '../scripts/cards';

import { 
  configureProfileEditPopup, 
  configureCardsEditPopup,
  animatedClassPopupOpen,
  addFormNewPlaceSubmitHandler,
  openPopup,
  configurePopupCardImage,
} from "./modal.js";

import { createAndAddCardEnd } from './card.js'

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// функционал
configureCardsEditPopup();
configureProfileEditPopup();
animatedClassPopupOpen();
addCards(openCardPopap);
addFormNewPlaceSubmitHandler(openCardPopap);
configurePopupCardImage();

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
    createAndAddCardEnd(element, openCardPopapCallback)
  });
}

export { cardsContainer };

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");

export { openCardPopap };
