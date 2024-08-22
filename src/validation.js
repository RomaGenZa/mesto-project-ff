// функция активации валидации - enableValidation
// функция очистки ошибок валидации - clearValidation
function watch() {
  console.log(formProfile);
  console.log(inputProfileName);
}

const formProfile = document.querySelector("#form__profile");
const inputProfileName = formProfile.querySelector(".popup__input_type_name");
const inputProfileAboutMe = formProfile.querySelector(
  ".popup__input_type_description"
);

function enableValidation(elemnt) {
  elemnt.classList.add("popup__input__error");
}

function clearValidation(elemnt) {
  elemnt.classList.remove("popup__input__error");
}

function validateInput(evt) {
  const input = evt.currentTarget;
  console.log(evt);
  if (!input.validity.valid) {
    enableValidation(input);
  } else {
    clearValidation(input);
  }
}

inputProfileName.addEventListener("input", validateInput);
inputProfileAboutMe.addEventListener("input", validateInput);

export { watch };
