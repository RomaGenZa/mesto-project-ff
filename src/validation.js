// функция активации валидации - enableValidation
// функция очистки ошибок валидации - clearValidation

function addClassError(form, input) {
  const errorString = form.querySelector(`.${input.id}-error`);
  console.log(errorString);
  input.classList.add("popup__input__error");
  errorString.classList.add("popup__form__input-error");
  errorString.textContent = input.validationMessage;
}

function deleteClassError(form, input) {
  const errorString = form.querySelector(`.${input.id}-error`);
  console.log(errorString);
  input.classList.remove("popup__input__error");
  errorString.classList.remove("popup__form__input-error");
  errorString.textContent = "";
}

function validateInput(form, input) {
  if (!input.validity.valid) {
    addClassError(form, input);
  } else {
    deleteClassError(form, input);
  }
}

function additionValidateForm(form) {
  const allInputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".button");
  allInputs.forEach(function (inputProfileName) {
    inputProfileName.addEventListener("input", () => {
      validateInput(form, inputProfileName);
      changingButtonState(allInputs, button);
    });
  });
}

function validationForm() {
  const allForms = Array.from(document.querySelectorAll(".popup__form"));
  allForms.forEach(function (formProfile) {
    formProfile.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    additionValidateForm(formProfile);
  });
}

function validateInputButtonSave(inputSet) {
  return inputSet.some((input) => {
    return !input.validity.valid;
  });
}

function changingButtonState(inputSet, button) {
  if (validateInputButtonSave(inputSet)) {
    button.disabled = true;
    button.classList.add("button__not__active");
  } else {
    button.disabled = false;
    button.classList.remove("button__not__active");
  }
}

export { validateInput };

export { deleteClassError };

export function enableValidation(conf) {
  const allForms = Array.from(document.querySelectorAll(conf.formSelector));
  allForms.forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const button = form.querySelector(conf.submitButtonSelector);

    const allInputs = Array.from(form.querySelectorAll(conf.inputSelector));
    allInputs.forEach(function (input) {
      input.addEventListener("input", () => {
        const errorString = form.querySelector(`.${input.id}-error`);

        if (!input.validity.valid) {
          input.classList.add(conf.inputErrorClass);
          errorString.classList.add(conf.errorClass);
          errorString.textContent = input.validationMessage;
        } else {
          input.classList.remove(conf.inputErrorClass);
          errorString.classList.remove(conf.errorClass);
          errorString.textContent = "";
        }
        button.disabled = allInputs.some((input) => {
          return !input.validity.valid;
        })

        if (button.disabled) {
          button.classList.add(conf.inactiveButtonClass);
        } else {
          button.classList.remove(conf.inactiveButtonClass);
        }
      });
    });
  });
}

export function clearValidation(form, conf) {
  const button = form.querySelector(conf.submitButtonSelector);
  button.disabled = true;
  button.classList.add(conf.inactiveButtonClass);

  const allInputs = Array.from(form.querySelectorAll(conf.inputSelector));
  allInputs.forEach(function (input) {
    const errorString = form.querySelector(`.${input.id}-error`);

    input.classList.remove(conf.inputErrorClass);
    errorString.classList.remove(conf.errorClass);
    errorString.textContent = "";
  });
}

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input__error",
  errorClass: "popup__error_visible",
}
