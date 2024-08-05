import { popupContent as pC } from "./index";
import {OnEscPressedHandler} from './OnEscPressedHandler';
import {smoothClosingPopups} from './smoothClosingPopups';

const popupProfile = document.querySelector(".popup_type_edit");

// Объект с информацией профиля
const EditingInformation = {
  name: "Жак-Ив Кусто",
  description: "Исследователь океана",
};

// редактирование данных popup "профиля"
function fillProfileForm() {
  const formEditProfile = document.forms["edit-profile"];

  const inputName = formEditProfile.elements.name;
  inputName.value = EditingInformation.name;
  
  const inputDescription = formEditProfile.elements.description;
  inputDescription.value = EditingInformation.description;


  formEditProfile.addEventListener('submit', function(evt) {
    evt.preventDefault();
    EditingInformation.name = inputName.value;
    EditingInformation.description = inputDescription.value;
    smoothClosingPopups(popupProfile);
    document.querySelector('.profile__title').textContent = inputName.value;
    document.querySelector('.profile__description').textContent = inputDescription.value
  })
}

//настройка popup редактирование "профиля"
function configureProfileEditPopup() {
  const buttonProfile = document.querySelector(".profile__edit-button");
  const buttonClosePopup = popupProfile.querySelector(".popup__close");

  buttonProfile.addEventListener("click", function(evt) {
    evt.preventDefault();
    popupProfile.classList.add('popup_is-opened');
    document.addEventListener("keydown", OnEscPressedHandler);
    fillProfileForm();
  })
  
  buttonClosePopup.addEventListener("click", function() {
    smoothClosingPopups(popupProfile);
  })
  
  popupProfile.addEventListener("click", function (evt) {
    if (!pC.contains(evt.target)) {
      smoothClosingPopups(popupProfile);
    }
  });
}

export { configureProfileEditPopup };
