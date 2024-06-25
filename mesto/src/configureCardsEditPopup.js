import { popupContent as pC } from './index'
import {OnEscPressedHandler} from './OnEscPressedHandler';

function configureCardsEditPopup() {
  const buttonNewPlace = document.querySelector('.profile__add-button');
  const popupNewPlace = document.querySelector(".popup_type_new-card");
  const btnClosePopupNewPlace = popupNewPlace.querySelector(".popup__close");

  buttonNewPlace.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupNewPlace.style.display = "flex";
    document.addEventListener("keydown", OnEscPressedHandler);
  });

  btnClosePopupNewPlace.addEventListener("click", function () {
    popupNewPlace.style.display = "none";
  });

  popupNewPlace.addEventListener('click', function(evt) {
    if (!pC.contains(evt.target)){
      popupNewPlace.style.display = "none";
    } 
  });
}

export {configureCardsEditPopup};