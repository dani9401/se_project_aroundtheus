//CARD CLASS ------------------------------------------------------------

export default class Card {
  constructor(initialCards, cardSelector, handleCardClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // - - - - - - Event Handlers - - - - - -
  _handleLikeIcon() {
    this._cardLikeButton.classList.toggle("gallery__card-like-button_active");
  }

  _handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
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
      const cardData = {
        name: this._cardTitle.textContent,
        link: this._cardImage.src,
      };
      this._handleCardClick(cardData);
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
