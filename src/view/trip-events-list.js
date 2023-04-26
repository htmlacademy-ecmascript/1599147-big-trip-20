import { createElement } from '../render.js';
import { createEventListTemplate } from '../templates/trip-events-list-template.js';

// const createEventListTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class TripEventListView {

  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

}
