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
