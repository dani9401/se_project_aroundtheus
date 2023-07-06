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
