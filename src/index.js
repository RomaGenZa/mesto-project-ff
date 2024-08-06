// импорт главного файла стилей
import "../pages/index.css";

// импорт popup настройки профиля
import { configureProfileEditPopup } from "./modal.js";

// импорт popup настройки карточек
import { configureCardsEditPopup } from "./modal.js";

// импорт функции добавления класса "popup_is-animated"
import {addClassPopupOpen} from './modal.js'

// добавление начальных карточек
import {addCards} from './card.js'

// функционал
configureCardsEditPopup();
configureProfileEditPopup();
addClassPopupOpen();
addCards();

// экспорт <div class="popup__content"> для реализации закрытия popup кликом вне popup__content
export const popupContent = document.querySelector(".popup__content");
