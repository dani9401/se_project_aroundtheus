import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector }); //this instantiates the PopupClass
  }

  //change the parent open() method
  //add an image to the popup and the corresponding image src attribute along with a caption for the image.

  open() {
    super.open();
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewTitle.textContent = this._name;
  }
}
