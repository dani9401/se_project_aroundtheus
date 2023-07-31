import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");

    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonText = this._popupElement.querySelector(
      ".modal__save-button"
    ).textContent;
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
}
