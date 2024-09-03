import { validationConfig, clearValidation } from "./validation.js";


//закрытие popup клавишей Escape
function onEscPressedHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);

    const form = popup.querySelector(".popup__form");
    
    if (form !== null) {
      clearValidation(form, validationConfig)
    }
  }
}

// метод закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscPressedHandler);
}

// метод открытия popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscPressedHandler);
}



export { closePopup, onEscPressedHandler, openPopup };
