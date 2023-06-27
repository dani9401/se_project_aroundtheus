//child class of Popup class
import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

// index.js example below from Max

//const newCardPopup = new PopupWithForm("#add-card-modal", () => {});

//newCardPopup.open();
//newCardPopup.close();

//reminder to make sure our form continues to clear any previously filled in values if
//the popup is closed before submitting. When popup is reopened, fields should
// always be empty/cleared.
