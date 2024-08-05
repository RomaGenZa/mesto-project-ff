import {OnEscPressedHandler} from './OnEscPressedHandler';
import {smoothClosingPopups} from './smoothClosingPopups';
import{createAndAddCard} from './index';
const popupNewPlace = document.querySelector(".popup_type_new-card");


// настройка popup добавления новых карточек
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

// добавление карточек 
const formNewPlace = document.forms['new-place'];

formNewPlace.addEventListener('submit', function(evt) {
  const inputPlaceName = formNewPlace.elements['place-name'];
  const inputPlaceLink = formNewPlace.elements.link;
  evt.preventDefault();
  const cardData = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  };
  
  createAndAddCard(cardData);

  smoothClosingPopups(popupNewPlace);
})

// добавление новых карточек конфигурация popup
function formConfiguration() {
  
  const inputPlaceName = formNewPlace.elements['place-name'];
  inputPlaceName.value = '';

  const inputPlaceLink = formNewPlace.elements.link;
  inputPlaceLink.value = '';
} 

export {configureCardsEditPopup};
