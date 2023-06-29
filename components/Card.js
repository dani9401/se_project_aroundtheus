import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

//PREVIEW IMAGE MODAL-------------------------------------------------
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__image-title");
//const previewImagePopup = new Popup({ popupSelector: "#preview-image-modal" });
const previewImagePopup = new PopupWithImage("#preview-image-modal");

//CARD CLASS ------------------------------------------------------------

export default class Card {
  constructor(initialCards, cardSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
  }
  //Connect the Card class to the popup.
  //Make Card take the handleCardClick() function into the constructor.
  //When the user clicks on the card, this function will open the popup with an image.

  // - - - - - - Event Handlers - - - - - -
  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("gallery__card-like-button_active");
  }

  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewImage() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewTitle.textContent = this._name;
    previewImagePopup.open();
  }

  // - - - - - - Event Listeners - - - - - -
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewImage();
    });
  }

  // - - - - - - Get Template - - - - - -
  _getTemplate() {
    const cardElement =
      this._cardSelector.content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  // - - - - - - Generate Card - - - - - -
  getView() {
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".gallery__card-title");
    this._cardImage = this._cardElement.querySelector(".gallery__card-image");
    this._cardLikeButton = this._cardElement.querySelector(
      ".gallery__card-like-button"
    );
    this._cardDeleteButton = this._cardElement.querySelector(
      ".gallery__card-delete-button"
    );

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
