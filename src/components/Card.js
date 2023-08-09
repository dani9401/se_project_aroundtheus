//CARD CLASS ------------------------------------------------------------

export default class Card {
  constructor(
    name,
    link,
    cardLikes,
    cardID,
    ownerID,
    myID,
    cardSelector,
    handleCardClick,
    handleDeleteBinClick,
    handleCardLike
  ) {
    this._name = name;
    this._link = link;
    this._cardLikes = cardLikes;
    this._cardLikesCount = cardLikes.length;
    this.cardID = cardID;
    this._ownerID = ownerID;
    this._myID = myID;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBinClick = handleDeleteBinClick;
    this._handleCardLike = handleCardLike;
  }

  // - - - - - - Event Handlers - - - - - -
  handleCardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _renderActiveLikeButton() {
    this._cardLikes.forEach((like) => {
      if (like._id === this._myID) {
        this._cardLikeButton.classList.add("gallery__card-like-button_active");
      }
    });
  }

  cardIsLiked() {
    return this._cardLikes.some((likes) => {
      return likes._id === this._myID;
    });
  }

  updateLikeCount(result) {
    this._cardLikes = result.likes;
    this._showCardLikes();
  }

  _showCardLikes() {
    if (this._cardLikes.length > 0) {
      this._cardLikeCounter.textContent = this._cardLikes.length;
    } else {
      this._cardLikeCounter.textContent = "";
    }
    if (this.cardIsLiked()) {
      this._cardLikeButton.classList.add("gallery__card-like-button_active");
    } else {
      this._cardLikeButton.classList.remove("gallery__card-like-button_active");
    }
  }

  // - - - - - - Event Listeners - - - - - -
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteBinClick(this.cardID, this);
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
    this._cardLikeCounter = this._cardElement.querySelector(
      ".gallery__card-like-count"
    );

    this._cardDeleteButton = this._cardElement.querySelector(
      ".gallery__card-delete-button"
    );

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCounter.textContent = this._cardLikesCount;

    this._setEventListeners();
    this._renderActiveLikeButton();

    if (this._ownerID !== this._myID) {
      this._cardDeleteButton.remove();
    }

    return this._cardElement;
  }
}
