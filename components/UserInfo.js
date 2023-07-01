//The UserInfo class is responsible for rendering information about the user on the page.
export default class UserInfo {
  constructor({ userNameSelector, userTitleSelector }) {
    // this._userNameSelector = userNameSelector;
    // this._userTitleSelector = userTitleSelector;
    this._userNameElement = document.querySelector(userNameSelector);
    this._userTitleElement = document.querySelector(userTitleSelector);
  }

  getUserInfo() {
    //returns an object with information about the user.
    //handy for cases when it's necessary to display the user data in the open form.
    const userInfo = {
      userName: this._userNameElement.textContent,
      userTitle: this._userTitleElement.textContent,
    };
    // get the user info from the elements
    return userInfo;
  }

  setUserInfo(userName, userTitle) {
    // takes new user data and adds it on the page.
    // profileTitleInput.value = profileTitle.textContent;
    // profileDescriptionInput.value = profileDescription.textContent;
    this._userNameElement.textContent = userName.value;
    this._userTitleElement.textContent = userTitle.value;
  }
}

//Create an instance of the UserInfo class in index.js.
//Use its method setUserInfo() to handle the form submission inside an instance of the PopupWithForm class.
