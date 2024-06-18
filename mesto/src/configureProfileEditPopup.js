function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");
  const buttonNewCards = document.querySelector('.profile__add-button');
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const buttonCloseP = popupNewCard.querySelector(".popup__close");

  buttonProfile.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupProfile.style.display = "flex";
  });

  buttonClosePopup.addEventListener("click", function (evt) {
    popupProfile.style.display = "none";
  });

  buttonNewCards.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupNewCard.style.display = "flex";
  });

  buttonCloseP.addEventListener("click", function (evt) {
    popupNewCard.style.display = "none";
  });
}

export {configureProfileEditPopup};