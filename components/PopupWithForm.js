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
      this.handleFormSubmit(inputValues);
    });

    //click event listener to close icon
  }
}

// index.js example below from Max

//const newCardPopup = new PopupWithForm("#add-card-modal", () => {});

//newCardPopup.open();
//newCardPopup.close();

//reminder to make sure our form continues to clear any previously filled in values if
//the popup is closed before submitting. When popup is reopened, fields should
// always be empty/cleared.
