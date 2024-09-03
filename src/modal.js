

//закрытие popup клавишей Escape
function onEscPressedHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

// метод закрытия popup
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscPressedHandler);
}

// метод открытия popup
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscPressedHandler);
}