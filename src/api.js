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
  deleteCard(cardID) {
    return fetch(
      //"https://around.nomoreparties.co/v1/cohort-3-en/cards",
      `${this._baseURL}/cards/${cardID}`,
      {
        method: "DELETE",
        headers: {
          authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - CREATE NEW CARD - - - - -
  createNewCard(nameData, linkData) {
    fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: nameData,
        link: linkData,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
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

  editProfileInfo(nameInput, descriptionInput) {
    fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: nameInput,
        about: descriptionInput,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - EDIT PROFILE PICTURE - - - - -

  // - - - - - ADDING & REMOVING LIKES - - - - -
}

//Promise.all(promises).then((results) => {
//  console.log(results); // ["First promise", "Second promise"]
//});

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
