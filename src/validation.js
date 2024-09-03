// функция активации валидации - enableValidation
// функция очистки ошибок валидации - clearValidation

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

        if (input.validity.patternMismatch) {
          input.setCustomValidity(input.dataset.errorMessage);
        } else {
          input.setCustomValidity("");
        }

        if (!input.validity.valid) {
          input.classList.add(conf.inputErrorClass);
          errorString.classList.add(conf.errorClass);
          errorString.textContent = input.validationMessage;
        } else {
          removeValidationError(input, conf);
        }

        const isActive = allInputs.every((input) => input.validity.valid)
        activateButton(button, isActive, conf)
      });
    });
  });
}

export function clearValidation(form, conf) {
  const button = form.querySelector(conf.submitButtonSelector);
  activateButton(button, false, conf)

  const allInputs = Array.from(form.querySelectorAll(conf.inputSelector));
  allInputs.forEach((input) => removeValidationError(input, conf));
}

function removeValidationError(input, conf) {
  const errorString = form.querySelector(`.${input.id}-error`);

  input.classList.remove(conf.inputErrorClass);
  errorString.classList.remove(conf.errorClass);
  errorString.textContent = "";
}

function activateButton(button, isActive, conf) {
  button.disabled = !isActive
  if (isActive) {
    button.classList.remove(conf.inactiveButtonClass);
  } else {
    button.classList.add(conf.inactiveButtonClass);
  }
}

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input__error",
  errorClass: "popup__error_visible",
}
