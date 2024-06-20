function configureCardsEditPopup() {
  const buttonNewCards = document.querySelector('.profile__add-button');
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const buttonCloseP = popupNewCard.querySelector(".popup__close");

  buttonNewCards.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupNewCard.style.display = "flex";
  });

  buttonCloseP.addEventListener("click", function () {
    popupNewCard.style.display = "none";
  });
}

export {configureCardsEditPopup};