// функция активации валидации - enableValidation
// функция очистки ошибок валидации - clearValidation


function addClassError(form, input) {
  const errorString = form.querySelector(`.${input.id}-error`);
  console.log(errorString);
  input.classList.add("popup__input__error");
  errorString.classList.add('popup__form__input-error');
  errorString.textContent = input.validationMessage;
}

function deleteClassError(form, input) {
  const errorString = form.querySelector(`.${input.id}-error`);
  console.log(errorString);
  input.classList.remove("popup__input__error");
  errorString.classList.remove('popup__form__input-error');
  errorString.textContent = '';
}

function validateInput(form, input) {
  if (!input.validity.valid) {
    addClassError(form, input);
  } else {
    deleteClassError(form, input);
  }
}

function additionValidateForm (form) {
const allInputs = Array.from(form.querySelectorAll('.popup__input'));
const button = form.querySelector('.button');
allInputs.forEach( function (inputProfileName) {
  inputProfileName.addEventListener('input', () => {
    validateInput(form, inputProfileName);
    changingButtonState(allInputs, button)
  })
})
}

function validationForm () {
  const allForms = Array.from(document.querySelectorAll('.popup__form'));
  allForms.forEach(function (formProfile) {
    formProfile.addEventListener('submit', function(evt) {
      evt.preventDefault();
    })
    additionValidateForm (formProfile);
  })
}
validationForm ()

function validateInputButtonSave (inputSet) {
  return inputSet.some((input) => {
    return !input.validity.valid;
  })
}

function changingButtonState (inputSet, button) {
  if (validateInputButtonSave (inputSet)) {
    button.disabled = true;
    button.classList.add('button__not__active');
  } else {
    button.disabled = false;
    button.classList.remove('button__not__active');
  }
}



export { validateInput };

export { deleteClassError };

function enableValidation(conf) {
  const form = document.querySelector(conf.formSelector);
  const input = form.querySelector(conf.inputSelector);
  console.log(input)
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
