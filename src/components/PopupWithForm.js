import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._popupForm.reset();
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
