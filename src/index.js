// импорт главного файла стилей
import "../pages/index.css";

// импорт popup настройки профиля
import { configureProfileEditPopup } from "./configureProfileEditPopup.js";

// импорт popup настройки карточек
import { configureCardsEditPopup } from "./configureCardsEditPopup.js";

// импорт функции добавления класса "popup_is-animated"
import {addClassPopupOpen} from './addClassPopupOpen.js'

// добавление начальных карточек
import {addCards} from './cardsActions.js'

// функционал
configureCardsEditPopup();
configureProfileEditPopup();
addClassPopupOpen();
addCards();

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");
