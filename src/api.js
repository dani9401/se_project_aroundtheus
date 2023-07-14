class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
    "Content-Type": "application/json",
  },
});
