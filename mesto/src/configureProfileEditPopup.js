import { popupContent as pC } from "./index";
import {OnEscPressedHandler} from './OnEscPressedHandler';

function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");

  buttonProfile.addEventListener("click", function(evt) {
    evt.preventDefault();
    popupProfile.style.display = "flex";
    document.addEventListener("keydown", OnEscPressedHandler);
  })
  
  buttonClosePopup.addEventListener("click", function() {
    popupProfile.style.display = "none";
  })
  
  popupProfile.addEventListener("click", function (evt) {
    if (!pC.contains(evt.target)) {
      popupProfile.style.display = "none";
    }
  });
}

export { configureProfileEditPopup };
