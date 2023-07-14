class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._authToken = options.headers.authorization;
    this._contentType = options.headers.contentType;
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
      headers: {
        authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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

api
  .getInitialCards()
  .then((result) => {})
  .catch((err) => {
    console.error(err); // log the error to the console
  });
