import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import "../pages/index.css";
import "../components/Api.js";
import Api from "../components/Api.js";
//import { cardListEl, cardListSection } from "../components/constants.js";

//API  -----------------------------------------------------------
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "61d2a1b6-82a5-4ea1-a1a2-2a63d3c4120b",
    contentType: "application/json",
  },
});

let cardListSection;
let myID;

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    myID = userData._id;
    cardListSection = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const newCard = createCard(data);
          cardListSection.addItem(newCard);
        },
      },
      cardListEl
    );
    cardListSection.renderItems();
  })
  .catch(console.error);

//CARD  -----------------------------------------------------------
const cardSelector = document.querySelector("#card-template");
const cardListEl = document.querySelector(".gallery__list");

//VALIDATION CLASS------------------------------------------------
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
const addCardModal = document.querySelector("#add-card-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector("#modal-add-form");
const editAvatarForm = document.querySelector("#modal-edit-avatar-form");

const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

const editAvatarFormValidator = new FormValidator(
  validationSettings,
  editAvatarForm
);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

// POPUP CLASS-------------------------------------------------------
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit,
  "Save",
  "Saving..."
);
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit,
  "Save",
  "Saving..."
);

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleEditAvatarSubmit,
  "Save",
  "Saving..."
);
const previewImagePopup = new PopupWithImage("#preview-image-modal");

const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-modal",
  handleConfirmButtonSubmit
);

// USER INFO CLASS-------------------------------------------------------
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userTitleSelector: ".profile__description",
  userPictureSelector: ".profile__image",
});

//PROFILE EDIT MODAL-------------------------------------------------
const profileEditButton = document.querySelector("#profile-edit-button");
const avatarEditButton = document.querySelector(".profile__avatar-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//ADD CARD MODAL-----------------------------------------------------
const addCardButton = document.querySelector("#add-card-button");

//EVENT LISTENERS------------------------------------------------------
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
previewImagePopup.setEventListeners();
deleteCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  editAvatarFormValidator.disableButton();
  handleEditAvatarClick();
});

profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  addCardPopup.open();
});

//FUNCTIONS & EVENT HANDLERS----------------------------------------------
function createCard(cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    cardData.likes,
    cardData._id,
    cardData.owner._id,
    myID,
    cardSelector,
    handleCardClick,
    handleDeleteBinClick,
    handleCardLike
  );
  return card.getView();
}

function handleEditAvatarClick() {
  editAvatarPopup.open();
}

function handleEditAvatarSubmit(inputValue) {
  editAvatarPopup.showLoading();
  api
    .editProfilePicture(inputValue.link)
    .then(() => {
      userInfo.setUserAvatar(inputValue.link);
      editAvatarPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      editAvatarPopup.hideLoading();
    });
}

function handleProfileEditClick() {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.userName;
  profileDescriptionInput.value = info.userTitle;
  profileEditPopup.open();
}

function handleEditProfileSubmit(inputValues) {
  profileEditPopup.showLoading();
  api
    .editProfileInfo(inputValues.title, inputValues.description)
    .then(() => {
      userInfo.setUserInfo(inputValues.title, inputValues.description);
      profileEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditPopup.hideLoading();
    });
}

function handleAddCardSubmit(inputValues) {
  addCardPopup.showLoading();
  api
    .createNewCard(inputValues.title, inputValues.link)
    .then((res) => {
      const newCard = createCard(res);
      cardListSection.addItem(newCard);
      addCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addCardPopup.hideLoading();
    });
}

function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}

function handleDeleteBinClick(cardID) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(cardID)
      .then((res) => {
        this.handleCardDelete();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {});
  });
}

function handleConfirmButtonSubmit() {
  handleCardDelete();
}

function handleCardLike(card) {
  if (card.cardIsLiked()) {
    api
      .deleteCardLike(card._cardID)
      .then((res) => {
        card.updateLikeCount(res);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addCardLike(card._cardID)
      .then((res) => {
        card.updateLikeCount(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
