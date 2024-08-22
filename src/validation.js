// функция активации валидации - enableValidation
// функция очистки ошибок валидации - clearValidation
function watch() {
  console.log(formProfile);
  console.log(inputProfileName);
}


const formProfile = document.querySelector('#form__profile');
const inputProfileName = formProfile.querySelector('.popup__input_type_name');
const inputProfileAboutMe = formProfile.querySelector('.popup__input_type_description');

function enableValidation(elemnt) {
  elemnt.classList.add('popup__input__error');
};

function clearValidation(elemnt) {
  elemnt.classList.remove('popup__input__error');
};

function checksValidName() {
  if (!inputProfileName.validity.valid) {
    enableValidation(inputProfileName);
  } else {
    clearValidation(inputProfileName);
  }
};

function checksValidAboutMe() {
  if (!inputProfileAboutMe.validity.valid) {
    enableValidation(inputProfileAboutMe);
  } else {
    clearValidation(inputProfileAboutMe);
  }
};


inputProfileName.addEventListener('input', checksValidName);
inputProfileAboutMe.addEventListener('input', checksValidAboutMe);

export {watch};