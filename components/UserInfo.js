//The UserInfo class is responsible for rendering information about the user on the page.
class UserInfo {
  constructor({ userName, userJob }) {}

  getUserInfo() {
    //returns an object with information about the user.
    //handy for cases when it's necessary to display the user data in the open form.
  }

  setUserInfo() {
    // takes new user data and adds it on the page.
  }
}

//Create an instance of the UserInfo class in index.js.
//Use its method setUserInfo() to handle the form submission inside an instance of the PopupWithForm class.
