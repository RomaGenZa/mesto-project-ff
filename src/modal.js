// import { inputProfileName } from './validation.js';
import { deleteClassError } from "./validation.js";


//закрытие popup клавишей Escape
function onEscPressedHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

// метод закрытия popup
function closePopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscPressedHandler);
  const form = popup.querySelector(".popup__form");
  if (form !== null) {
    const inputs = Array.from(form.querySelectorAll(".popup__input"));
    inputs.forEach((input) => {
      deleteClassError(form, input);
    });
  }
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

export { closePopup, onEscPressedHandler, openPopup, closePopupByOverlay };
