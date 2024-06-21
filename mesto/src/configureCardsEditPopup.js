import {popupContent as pC} from './index'

function configureCardsEditPopup() {
  const buttonNewCards = document.querySelector('.profile__add-button');
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const buttonCloseP = popupNewCard.querySelector(".popup__close");

  buttonNewCards.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupNewCard.style.display = "flex";
    document.addEventListener("keydown", OnEscPressed);
  });

  buttonCloseP.addEventListener("click", function () {
    popupNewCard.style.display = "none";
  });

  popupNewCard.addEventListener('click', function(evt) {
    if (!pC.contains(evt.target)){
      popupNewCard.style.display = "none";
    } 
  });

  function OnEscPressed(evt) {
    if (evt.key === "Escape") {
      popupNewCard.style.display = "none";
      document.removeEventListener("keydown", OnEscPressed);
    }
  }
}

export {configureCardsEditPopup};