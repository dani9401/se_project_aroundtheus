class Section {
  constructor({ items, renderer }, selector) {
    //It has an object with two properties (items and renderer) as the first parameter of the constructor.
    //The items property serves as an array of data, which you need to add on a page when initializing the class.
    //The renderer property is a function responsible for creating and rendering data on a page.
    //The second parameter should be a CSS class selector where you'll add the card elements.
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }

  renderItems() {
    //renderItems() renders all elements on the page.
  }

  renderer() {
    //renderer() function will render each element on a page.
  }

  addItem() {
    //takes a DOM element and adds it to the container.
  }
}

//The Section class doesn't have markup.
//It receives markup through the callback function and inserts it in the container.
