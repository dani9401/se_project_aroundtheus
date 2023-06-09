export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = this._inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(_inputEl) {
    if (!this._inputEl.validity.valid) {
      _showInputError(this._form, this._inputEl);
    } else {
      _hideInputError(this._form, this._inputEl);
    }
  }

  toggleButtonState(_inputEls, _submitButton) {
    const _isFormValid = _checkFormValidity(this._inputEls);
    if (!_isFormValid) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _checkFormValidity(_inputEl) {
    _inputEls.every((_inputEl) => this._inputEl.validity.valid);
  }

  _setEventListeners() {
    _inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    _submitButton = this._form.querySelector(this._submitButtonSelector);

    _inputEls.forEach((_inputEl) => {
      this._inputEl.addEventListener("input", () => {
        _checkInputValidity(this._form, this._inputEl);
        toggleButtonState(this._inputEl, this._submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    _setEventListeners();
  }
}
