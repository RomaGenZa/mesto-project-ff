function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");

  buttonProfile.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupProfile.style.display = "flex";
  });

  buttonClosePopup.addEventListener("click", function () {
    popupProfile.style.display = "none";
  });

  const popcontent = document.querySelector('.popup__content');
  popupProfile.addEventListener('click', function(evt) {
    if (!popcontent.contains(evt.target)){
      popupProfile.style.display = "none";
    } 
  });
}

export {configureProfileEditPopup};