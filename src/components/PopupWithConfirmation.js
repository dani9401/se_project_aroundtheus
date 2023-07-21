import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmButtonSubmit) {
    super({ popupSelector });
    this._confirmButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._handleConfirmButtonSubmit = handleConfirmButtonSubmit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("submit", (e) => {
      e.preventDefault();
      //decide what else should go here
      this.handleConfirmButtonSubmit();
    });
  }

  setSubmitAction(action) {
    this.handleConfirmButtonSubmit = action;
  }
}
