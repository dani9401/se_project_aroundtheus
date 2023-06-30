export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");

    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  close() {
    this._popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //this._popupCloseButton.addEventListener("click", () => {
    //  this.close();
    //});

    const popupCloseButtons = document.querySelectorAll(".modal__close-button");

    popupCloseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });

    //this._popupElement.addEventListener("mousedown", () => {
    //  this.close();
    //});

    //this._popupElement.addEventListener("mousedown", (e) => {
    //  if (e.target.classList.contains("modal_opened")) {
    //    this.close();
    //  }
    //});
  }
}
