// функция активации валидации - enableValidation
// функция очистки ошибок валидации - clearValidation

export function watch() {
  console.log(formProfile);
}

// function validateInput(evt) {
//   const input = evt.currentTarget;
//   if (!input.validity.valid) {
//     addClassError(input);
//   } else {
//     deleteClassError(input);
//   }
// }

const formProfile = document.querySelector("#form__profile");
const inputProfileName = formProfile.querySelector(".popup__input_type_name");
const inputProfileAboutMe = formProfile.querySelector(".popup__input_type_description");
const errorString = formProfile.querySelector('.name__input-error');

function addClassError(elemnt) {
  elemnt.classList.add("popup__input__error");
  errorString.classList.add('popup__form__input-error');
  // inputError.classList.remove('transparent__input-error');
}

function deleteClassError(elemnt) {
  elemnt.classList.remove("popup__input__error");
  errorString.classList.remove('popup__form__input-error');
  // inputError.classList.add('transparent__input-error');
}

const btnClose = document.querySelector('.popup__close');
btnClose.addEventListener('click', () => {
  deleteClassError(inputProfileName);
})

function validateInput() {
  if (!inputProfileName.validity.valid) {
    addClassError(inputProfileName);
  } else {
    deleteClassError(inputProfileName);
  }
}


// function validateInput(form, input) {
//   if (!input.validity.valid) {
//     addClassError(form, input, input.validationMessage);
//   } else {
//     deleteClassError(form, input);
//   }
// }


inputProfileName.addEventListener("input", validateInput);
// inputProfileAboutMe.addEventListener("input", validateInput);

// export { watch };
export { validateInput };

export { deleteClassError };
