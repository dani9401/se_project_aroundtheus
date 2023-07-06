export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._cssSelector = selector;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(newCard) {
    this._cssSelector.prepend(newCard);
  }
}

//The Section class doesn't have markup.
//It receives markup through the callback function and inserts it in the container.

// Index.js Example

//const initialCards = [];

//const section = New Section({items: initialCards,
//  renderer: (item) => {
//creat your card here, use functionality I've already created
//call addItem from Section class and pass the already created card
//  }},
//   ".gallery__list")
// remember instantiating it doesn't actually call anything.
// you then have to call section.renderItems() in index

// selector is basically where you want your cards to show up
// ask yourself where you've done this already...html, gallery__list

//tight coupling when 2 classes have to be intertwined
//look into this with how I'm handling the PopupWithImage getting data from Card class
//this is why call backs are being passed to the construtors in many cases, to avoid classes being intertwined and
// depending on each other

//then in the form when you're trying to submit to create a new card, just use the same login I'm using
//when I'm instantiating above to generate new card
// and then call section.addItem() and then pass in the completed card so example might be...

// const card = createCard(cardData)
//section.addItem(card)
