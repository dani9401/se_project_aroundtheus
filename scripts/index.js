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

// ALL MODALS
const modals = Array.from(document.querySelectorAll(".modal"));

//PROFILE EDIT MODAL
const profileEditModal = document.querySelector("#profile-edit-modal");
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
const profileEditForm = profileEditModal.querySelector(".modal__form");

//ADD CARD MODAL
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");
const addCardCloseButton = addCardModal.querySelector("#close-add-card-modal");
const addCardTitleInput = addCardModal.querySelector("#add-card-title-input");
const addCardImageLinkInput = document.querySelector("#add-card-link-input");
const addCardForm = addCardModal.querySelector("#modal-add-form");
const addCardSaveButton = addCardModal.querySelector(".modal__save-button");

//Preview Image Modal
const previewImageModal = document.querySelector("#preview-image-modal");
const previewCloseButton = previewImageModal.querySelector(
  ".modal__close-button"
);
const previewImage = previewImageModal.querySelector(".modal__image");
const previewTitle = previewImageModal.querySelector(".modal__image-title");

//Gallery - Cards
const cardListEl = document.querySelector(".gallery__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// FUNCTIONS //
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalKeypress);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalKeypress);
}

function closeModalKeypress(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function disableSubmitButton() {}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".gallery__card-title");
  const cardImageEl = cardElement.querySelector(".gallery__card-image");
  const likeButton = cardElement.querySelector(".gallery__card-like-button");
  const deleteButton = cardElement.querySelector(
    ".gallery__card-delete-button"
  );

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__card-like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardImageEl.src;
    previewImage.alt = cardTitleEl.textContent;
    previewTitle.textContent = cardTitleEl.textContent;
    openModal(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// EVENT LISTENERS //
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
  openModal(addCardModal);
  toggleButtonState();
  addCardSaveButton.classList.add("modal__save-button_disabled");
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
  e.target.reset();
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

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
