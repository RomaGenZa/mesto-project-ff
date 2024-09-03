const showError = (formInput, formError, conf) => {
  formInput.classList.add(conf.inputErrorClass);
  formError.textContent = formInput.validationMessage;
  formError.classList.add(conf.errorClass);
};

const hideError = (formInput, formError, conf) => {
  formInput.classList.remove(conf.inputErrorClass);
  formError.classList.remove(conf.errorClass);
  formError.textContent = "";
  formInput.setCustomValidity("");
};

const checkInputValidity = (formInput, formError, conf) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else if (!formInput.validity.valid) {
    showError(formInput, formError, conf);
  } else {
    hideError(formInput, formError, conf);
  }
};

const activateButton = (button, isActive, conf) => {
  button.disabled = !isActive
  if (isActive) {
    button.classList.remove(conf.inactiveButtonClass);
  } else {
    button.classList.add(conf.inactiveButtonClass);
  }
}

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
        const formError = form.querySelector(`.${input.id}-error`);
        checkInputValidity(input, formError, conf);

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
  allInputs.forEach((input) => {
    const formError = form.querySelector(`.${input.id}-error`);
    hideError(input, formError, conf);
  });
}
