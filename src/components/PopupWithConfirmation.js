import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmButtonSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._confirmButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._handleConfirmButtonSubmit = handleConfirmButtonSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleConfirmButtonSubmit();
    });
  }

  setSubmitAction(action) {
    this.handleConfirmButtonSubmit = action;
  }
}
