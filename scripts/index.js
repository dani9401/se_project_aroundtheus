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

//PROFILE ADD MODAL
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddButton = document.querySelector("#profile-add-button");
const profileAddCloseButton = profileAddModal.querySelector(
  "#close-profile-add-modal"
);
const profileAddTitleInput =
  profileAddModal.querySelector(".modal__form-title");
const profileAddImageLinkInput = document.querySelector("#profile-link-input");
const profileAddForm = profileAddModal.querySelector("#modal-add-form");

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
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

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

profileAddButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileAddCloseButton.addEventListener("click", () => {
  closeModal(profileAddModal);
});

profileAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = profileAddTitleInput.value;
  const link = profileAddImageLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
  e.target.reset(profileAddTitleInput, profileAddImageLinkInput);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
