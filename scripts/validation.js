// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  //search for all the inputs inside of formEl, but use object deconstructing this time
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  //add event listener. Start by looping through each input
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  //collect all forms from html
  const formEls = [...document.querySelectorAll(options.formSelector)];
  //loop through each of the elements
  formEls.forEach((formEl) => {
    //add event listener on form element
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    //now call this function to do the bulk of the work.
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form", //used to be .popup__form
  inputSelector: ".modal__input", //used to be .popup__input
  submitButtonSelector: ".modal__save-button", //used to be .popup__button
  inactiveButtonClass: "modal__save-button_disabled", //used to be popup__button_disabled
  inputErrorClass: ".modal__input-error", //used to be popup__input_type_error
  errorClass: ".modal__input-error_active", //used to be popup__error_visible
};

enableValidation(config);
