//The UserInfo class is responsible for rendering information about the user on the page.
export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userTitleElement = document.querySelector(userTitleSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userNameElement.textContent,
      userTitle: this._userTitleElement.textContent,
    };
    return userInfo;
  }

  setUserInfo(userNameInput, userTitleInput) {
    this._userNameElement.textContent = userNameInput;
    this._userTitleElement.textContent = userTitleInput;
  }
}

//Create an instance of the UserInfo class in index.js.
//Use its method setUserInfo() to handle the form submission inside an instance of the PopupWithForm class.
