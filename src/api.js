export default class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._authToken = options.headers.authorization;
    this._contentType = options.headers.contentType;
  }

  // - - - - - GET INITIAL CARDS - - - - -
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: {
        authorization: this._authToken,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      if (res.ok) {
        Promise.resolve("Promise Resolved");
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - DELETE CARD - - - - -
  deleteCard(id) {
    return fetch(
      //"https://around.nomoreparties.co/v1/cohort-3-en/cards",
      `${this._baseURL}/${id}`,
      {
        headers: {
          authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - CREATE NEW CARD - - - - -
  createNewCard() {
    return fetch(`${this._baseURL}/cards`, {
      // do we still use fetch and return here when posting?
      headers: {
        authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
        "Content-Type": "application/json",
        // need to add request body to this one (confirm which line to put it on)
        // name should contain the name of the created card,
        // link should contain a link to the image.
      },
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        return res.json(); // what does this return when a post is successful
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - GET PROFILE INFO - - - - -
  getProfileInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: {
        authorization: this._authToken,
        "Content-Type": this._contentType,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - EDIT PROFILE NAME/DESCRIPTION - - - - -

  // - - - - - EDIT PROFILE PICTURE - - - - -

  // - - - - - ADDING & REMOVING LIKES - - - - -
}

//const api = new Api({
//  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
//  headers: {
//    authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
//    "Content-Type": "application/json",
//  },
//});

//api
// .getInitialCards()
// .then((result) => {
//section.renderItems();
// })
// .catch((err) => {
//   console.error(err); // log the error to the console
// });

//function renderCards(result) {
//  Promise.all(result);
//}
