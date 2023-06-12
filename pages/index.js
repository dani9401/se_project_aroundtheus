import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

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
function renderCard(cardData) {
  const card = new Card(cardData, cardSelector);
  cardListEl.prepend(card.getView());
}

//EVENT LISTENERS------------------------------------------------------
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
});

addCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardImageLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardForm.reset();
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((item) => renderCard(item));
