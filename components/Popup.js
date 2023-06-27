export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    //document.addEventListener("keydown", this._handleEscClose);
    //this._popupElement.addEventListener("mousedown", this.close);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    //document.removeEventListener("keydown", this._handleEscClose);
    //this._popupElement.removeEventListener("mousedown", this.close);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this.close();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.target.classList.contains("modal_opened")) {
        this._handleEscClose(e);
      }
    });
  }
}
