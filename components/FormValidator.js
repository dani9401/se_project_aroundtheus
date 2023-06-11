export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(_inputEl) {
    const errorMessageEl = this._form.querySelector(`#${_inputEl.id}-error`);
    _inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = _inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(_inputEl) {
    const errorMessageEl = this._form.querySelector(`#${_inputEl.id}-error`);
    _inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(_inputEl) {
    if (!_inputEl.validity.valid) {
      this._showInputError(_inputEl);
    } else {
      this._hideInputError(_inputEl);
    }
  }

  _toggleButtonState() {
    const _isFormValid = this._checkFormValidity();
    if (!_isFormValid) {
      this.disableButton();
    } else {
      this._submitButton.classList.remove(_inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _checkFormValidity() {
    this._inputEls.every((_inputEl) => _inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputEls.forEach((_inputEl) => {
      _inputEl.addEventListener("input", () => {
        this._checkInputValidity(_inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}
