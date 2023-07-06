import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  //change the parent open() method
  //add an image to the popup and the corresponding image src attribute along with a caption for the image.

  open(imageURL, imageTitle) {
    super.open();
    //previewImage.src = imageURL;
    //previewTitle.textContent = imageTitle;
  }
}
