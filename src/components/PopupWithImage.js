import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__image");
    this._imageTitle = this._popupElement.querySelector(".modal__image-title");
  }

  open(cardData) {
    super.open();
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._imageTitle.textContent = cardData.name;
  }
}
