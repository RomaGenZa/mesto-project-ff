import {OnEscPressedHandler} from './OnEscPressedHandler';
import {smoothClosingPopups} from './smoothClosingPopups';
import {formConfiguration} from './newPlaceFormConfiguration'


// настройка popup "добавления карточек"
function configureCardsEditPopup() {
  const buttonNewPlace = document.querySelector('.profile__add-button');
  const popupNewPlace = document.querySelector(".popup_type_new-card");
  const btnClosePopupNewPlace = popupNewPlace.querySelector(".popup__close");
  const popupCardContent = popupNewPlace.querySelector('.popup__content');
  
  buttonNewPlace.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupNewPlace.classList.add('popup_is-opened');
    formConfiguration();
    document.addEventListener("keydown", OnEscPressedHandler);
  });

  btnClosePopupNewPlace.addEventListener("click", function () {
    smoothClosingPopups(popupNewPlace);
  });

  popupNewPlace.addEventListener('click', function(evt) {
    if (!popupCardContent.contains(evt.target)){
      smoothClosingPopups(popupNewPlace);
    }
  });
}

export {configureCardsEditPopup};
