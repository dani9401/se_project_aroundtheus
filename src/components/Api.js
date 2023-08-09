export default class Api {
  constructor(options) {
    this._baseURL = options.baseUrl;
    this._authToken = options.headers.authorization;
    this._contentType = options.headers.contentType;
    this._headers = options.headers;
  }

  // - - - - - GET INITIAL CARDS - - - - -
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
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
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - CREATE NEW CARD - - - - -
  createNewCard(nameData, linkData) {
    return fetch(`${this._baseURL}/cards`, {
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
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - EDIT PROFILE NAME/DESCRIPTION - - - - -
  editProfileInfo(nameInput, descriptionInput) {
    return fetch(`${this._baseURL}/users/me`, {
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
  editProfilePicture(avatarLink) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authToken,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // - - - - - ADDING & REMOVING LIKES - - - - -
  addCardLike(cardID) {
    return fetch(`${this._baseURL}/cards/likes/${cardID}`, {
      method: "PUT",
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

  deleteCardLike(cardID) {
    return fetch(`${this._baseURL}/cards/likes/${cardID}`, {
      method: "DELETE",
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
}
