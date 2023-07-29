import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButtonText = this._popupElement.querySelector(
      ".modal__save-button"
    ).textcontent;
  }

  renderLoading(loadingStatus) {
    if (isLoading) {
      // Change button text to 'Saving...'
      this._submitButtonText = "Saving...";
    } else {
      // Change button text to default text
      this._submitButtonText = document.querySelector(
        ".modal__save-button"
      ).textContent;
    }
  }

  _getInputValues() {
    const inputData = this._popupForm.querySelectorAll(".modal__input");

    const inputObject = {};

    inputData.forEach((input) => {
      inputObject[input.name] - input.value; //why is input.name in brackets but value isn't?
    });

    return inputObject;
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
