import { popupContent as pC } from "./index";

function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");

  function addPopup(evt) {
    evt.preventDefault();
    popupProfile.style.display = "flex";
    document.addEventListener("keydown", OnEscapePressed);
  }
  buttonProfile.addEventListener("click", addPopup);

  function closePopup() {
    popupProfile.style.display = "none";
  }
  buttonClosePopup.addEventListener("click", closePopup);

  popupProfile.addEventListener("click", function (evt) {
    if (!pC.contains(evt.target)) {
      popupProfile.style.display = "none";
    }
  });

  function OnEscapePressed(evt) {
    if (evt.key === "Escape") {
      popupProfile.style.display = "none";
      document.removeEventListener("keydown", OnEscapePressed);
    }
  }
}
export { configureProfileEditPopup };
