export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
      //equivalent code = .forEach(this._renderer)
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
