import {popupContent as pC} from './index'

function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");

  function addPopup(evt) {
    evt.preventDefault();
    popupProfile.style.display = "flex";
  };
  buttonProfile.addEventListener("click", addPopup);
  
  buttonClosePopup.addEventListener("click", function () {
    popupProfile.style.display = "none";
  });

  popupProfile.addEventListener('click', function(evt) {
    if (!pC.contains(evt.target)){
      popupProfile.style.display = "none";
    } 
  });

  popupProfile.addEventListener('keydown', function(evt) {
    if (evt.key === 27) {
      popupProfile.style.display = "none";
      buttonProfile.removeEventListener("click", addPopup);
    }
  });
}

export {configureProfileEditPopup};