export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector, userPictureSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userTitleElement = document.querySelector(userTitleSelector);
    this._userPictureElement = document.querySelector(userPictureSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userNameElement.textContent,
      userTitle: this._userTitleElement.textContent,
    };
    return userInfo;
  }

  setUserInfo(userNameInput, userTitleInput, userPictureData) {
    this._userNameElement.textContent = userNameInput;
    this._userTitleElement.textContent = userTitleInput;
    this._userPictureElement.src = userPictureData;
  }

  setUserAvatar(userPictureData) {
    this._userPictureElement.src = userPictureData;
  }
}
