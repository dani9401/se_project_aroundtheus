import { openModal } from "../utils/utils.js";

//PREVIEW IMAGE MODAL-------------------------------------------------
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__image-title");

//CARD CLASS ------------------------------------------------------------

export default class Card {
  constructor(initialCards, cardSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
  }

  // - - - - - - Event Handlers - - - - - -
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".gallery__card-like-button")
      .classList.toggle("gallery__card-like-button_active");
  }

  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewImage() {
    previewImage.src = this._link;
    previewImage.alt = this._name;
    previewTitle.textContent = this._name;
    openModal(previewImageModal);
  }

  // - - - - - - Event Listeners - - - - - -
  _setEventListeners() {
    this._cardElement
      .querySelector(".gallery__card-like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".gallery__card-delete-button")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });

    this._cardElement
      .querySelector(".gallery__card-image")
      .addEventListener("click", () => {
        this._handlePreviewImage();
      });
  }

  // - - - - - - Get Template - - - - - -
  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  // - - - - - - Generate Card - - - - - -
  getView() {
    this._cardElement = this._getTemplate();
    this._cardTitle = this._cardElement.querySelector(".gallery__card-title");
    this._cardImage = this._cardElement.querySelector(".gallery__card-image");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;

    this._cardElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
