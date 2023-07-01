import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

//VALIDATION ------------------------------------------------------
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

// Popup Class-------------------------------------------------------
const profileEditPopup = new PopupWithForm("#profile-edit-modal", () => {
  const newUserInfo = {};
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  return newUserInfo;
});

const addCardPopup = new PopupWithForm("#add-card-modal", () => {
  const newCardData = {};
  addCardTitleInput = addCardTitleInput.value;
  addCardImageLinkInput = addCardImageLinkInput.value;
  return newCardData;
});

const previewImagePopup = new PopupWithImage("#preview-image-modal");

// UserInfo Class-------------------------------------------------------
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userTitleSelector: ".profile__description",
});

// ALL MODALS-------------------------------------------------------
const modals = Array.from(document.querySelectorAll(".modal"));

//PROFILE EDIT MODAL-------------------------------------------------
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditCloseButton = document.querySelector(
  "#close-profile-edit-modal"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//ADD CARD MODAL-----------------------------------------------------
const addCardButton = document.querySelector("#add-card-button");
const addCardCloseButton = addCardModal.querySelector("#close-add-card-modal");
const addCardTitleInput = addCardModal.querySelector("#add-card-title-input");
const addCardImageLinkInput = document.querySelector("#add-card-link-input");

const addCardSaveButton = addCardModal.querySelector(".modal__save-button");

//PREVIEW IMAGE MODAL--------------------------------------------------
const previewImageModal = document.querySelector("#preview-image-modal");
const previewCloseButton = previewImageModal.querySelector(
  ".modal__close-button"
);
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__image-title");

//GALLARY - CARDS-------------------------------------------------------
const cardListEl = document.querySelector(".gallery__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//FUNCTIONS-------------------------------------------------------------
function createCard(cardData) {
  const card = new Card(cardData, cardSelector);
  return card;
}

function renderCard(cardData) {
  const card = createCard(cardData);
  cardListEl.prepend(card.getView());
}

//EVENT LISTENERS------------------------------------------------------
profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profileTitleInput.value = info.userName;
  profileDescriptionInput.value = info.userTitle;
  profileEditPopup.open();
});

profileEditCloseButton.addEventListener("click", () => {
  profileEditPopup.close();
});

profileEditPopup.setEventListeners;
addCardPopup.setEventListeners;

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userInfo.setUserInfo(profileTitleInput.value, profileDescriptionInput.value);
  profileEditPopup.close();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

//addCardCloseButton.addEventListener("click", () => {
//  addCardPopup.close();
//});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //const name = addCardTitleInput.value;
  //const link = addCardImageLinkInput.value;
  renderCard({ name, link }, cardListEl);
  addCardPopup.close();
  addCardForm.reset();
  addCardFormValidator.disableButton();
});

//This function is the only way this modal closes with the closeButton
//
//previewCloseButton.addEventListener("click", () => {
//  previewImagePopup.close();
//});

//modals.forEach((modal) => {
//  modal.addEventListener("mousedown", (e) => {
//    if (e.target.classList.contains("modal_opened")) {
//      closeModal(modal);
//    }
//  });
//});

initialCards.forEach((item) => renderCard(item));

// Per OfficeHouse with Kevin, index.js should really only contain
// CLICK event listeners
