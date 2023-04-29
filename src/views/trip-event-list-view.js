import './trip-event-list-view.css';
import CardView from './card-view.js';
import View from './view.js';
import EventEditorView from './event-editor-view.js';


class TripEventList extends View {
  constructor() {
    super();

    this.classList.add('events-list');
    this.setAttribute('role', 'list');
  }

  /**
   * @override
   */
  render() {
    const views = Array(5).fill().map(this.createItemView);

    this.replaceChildren(...views);

  }

  createItemView(none, index) {

    const view = (index === 0) ? new EventEditorView() : new CardView();

    view.classList.add('events-list__item');
    view.setAttribute('role', 'listitem');
    view.render();

    return view;
  }
}

customElements.define('trip-event-list', TripEventList);

export default TripEventList;

