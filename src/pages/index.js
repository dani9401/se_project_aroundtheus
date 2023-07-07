import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/section.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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

const editProfileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// POPUP CLASS-------------------------------------------------------
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
const previewImagePopup = new PopupWithImage("#preview-image-modal");

// USER INFO CLASS-------------------------------------------------------
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userTitleSelector: ".profile__description",
});

// SECTION CLASS-------------------------------------------------------
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    },
  },
  cardListEl
);

section.renderItems();

//PROFILE EDIT MODAL-------------------------------------------------
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//ADD CARD MODAL-----------------------------------------------------
const addCardButton = document.querySelector("#add-card-button");
const addCardTitleInput = addCardModal.querySelector("#add-card-title-input");
const addCardImageLinkInput = document.querySelector("#add-card-link-input");

//EVENT LISTENERS------------------------------------------------------
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
previewImagePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  addCardPopup.open();
});

//FUNCTIONS & EVENT HANDLERS----------------------------------------------
function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleCardClick);
  return card.getView();
}

function handleProfileEditClick() {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.userName;
  profileDescriptionInput.value = info.userTitle;
  profileEditPopup.open();
}

function handleEditProfileSubmit(inputValues) {
  userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  profileEditPopup.close();
}

function handleAddCardSubmit(inputValues) {
  const newCardData = {
    name: addCardTitleInput.value,
    link: addCardImageLinkInput.value,
  };
  const newCard = createCard(newCardData);
  section.addItem(newCard);
  addCardPopup.close();
  addCardForm.reset();
}

function handleCardClick(cardData) {
  previewImagePopup.open(cardData);
}
