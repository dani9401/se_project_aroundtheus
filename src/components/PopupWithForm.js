import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    submitButtonText,
    submitButtonLoadingText
  ) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonText = submitButtonText;
    this._submitButtonLoadingText = submitButtonLoadingText;
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
  }

  showLoading() {
    this._submitButton.textContent = this._submitButtonLoadingText;
  }

  hideLoading() {
    this._submitButton.textContent = this._submitButtonText;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButtonText = "Saving...";
    } else {
      this._submitButtonText = this._submitButtonText;
    }
  }

  _getInputValues() {
    const inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    const inputValues = {};
    inputs.forEach((input) => {
      inputValues[input.name] = input.value; //why is input.name in brackets but value isn't?
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
