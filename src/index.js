// импорт главного файла стилей
import "../pages/index.css";

// импорт popup настройки профиля
import { 
  configureProfileEditPopup, 
  configureCardsEditPopup,
  animatedClassPopupOpen,
  closePopup,
  onEscPressedHandler 
} from "./modal.js";

// добавление начальных карточек
import {addCards} from './card.js'

// функционал
configureCardsEditPopup();
configureProfileEditPopup();
animatedClassPopupOpen();
addCards();

function openCardPopap(cardData) {
  
  const popCard = document.querySelector(".popup_type_image");

  const btnClose = popCard.querySelector(".popup__close");
  btnClose.addEventListener("click", function () {
    closePopup(popCard);
  });

  const contentImg = popCard.querySelector(".popup__image");
  contentImg.src = cardData.link;
  contentImg.alt = cardData.name;

  const contentTxt = popCard.querySelector(".popup__caption");
  contentTxt.textContent = cardData.name;

  popCard.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscPressedHandler);

  const popupImg = document.querySelector(".popup__content_content_image");
  popCard.addEventListener("click", function (evt) {
    if (!popupImg.contains(evt.target)) {
      closePopup(popCard);
    }
  });
}

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");
export { openCardPopap };
