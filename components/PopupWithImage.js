import Popup from "./Popup.js";
import Card from "./Card.js";
import { previewImage, previewTitle } from "./Card.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  //change the parent open() method
  //add an image to the popup and the corresponding image src attribute along with a caption for the image.

  open(imageURL, imageTitle) {
    super.open();
    previewImage.src = imageURL;
    previewImage.alt = imageTitle;
    previewTitle.textContent = imageTitle;
    console.log(previewImage.src);
    console.log(previewImage.textContent);
  }
}
