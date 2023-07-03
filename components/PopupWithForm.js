import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); //this instantiates the PopupClass
    this._popupForm = this._popupElement.querySelector(".modal__form"); //we have access to this bc of instantiation on L6
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    //collects data from all the input fields and returns that data as an object.
    const inputData = this._popupForm.querySelectorAll(".modal__input");

    const inputObject = {};

    inputData.forEach((input) => {
      inputObject[input.name] - input.value; //why is part of this is array brackets?
    });

    return inputObject;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.close();
    });

    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    //add submit event handler
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
