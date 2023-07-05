export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  renderItems() {
    //renderItems() renders all elements on the page.
    //this will actually render our initial cards to the page
    // use the screen shot from the other student in Discord as an example but with edits
    //take the items you've defined in constructor, and loop through them
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(newCard) {
    //takes a DOM element and adds it to the container.
    //this is also where you'll prepend it
    //this is what makes it visible on the page
    this._selector.prepend(newCard);
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
