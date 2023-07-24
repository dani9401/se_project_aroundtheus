//CARD CLASS ------------------------------------------------------------

export default class Card {
  constructor(
    name,
    link,
    cardID,
    ownerID,
    cardSelector,
    handleCardClick,
    handleDeleteBinClick
  ) {
    this._name = name;
    this._link = link;
    this._cardID = cardID;
    this._ownerID = ownerID;
    this._myID = "5b0dca03a3b5418a56e37bd7";
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBinClick = handleDeleteBinClick;
  }

  // - - - - - - Event Handlers - - - - - -
  _handleLikeIconClick() {
    this._cardLikeButton.classList.toggle("gallery__card-like-button_active");
  }

  handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  //handleBinIconClickEvent() {
  //  this._cardDeleteButton.addEventListener("click", () => {});
  //}

  // - - - - - - Event Listeners - - - - - -
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeIconClick();
    });

    //if (!this._ownerID === this._myID)
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteBinClick(this._cardID);
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
