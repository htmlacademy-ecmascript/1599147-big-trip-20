import './trip-event-list-view.css';
import CardView from './card-view.js';
import View from './view.js';
import EventEditorView from './event-editor-view.js';

/**
 * @extends {View<EventListViewState>}
 */
class TripEventListView extends View {
  constructor() {
    super();

    this.classList.add('events-list');
    this.setAttribute('role', 'list');
  }

  /**
   * @override
   */
  render() {
    const views = this.state.items.map(this.createItemView);

    this.replaceChildren(...views);

  }

  /**
   *
   * @param {EventViewState} state
   * @return {EventEditorView | CardView}
   */
  createItemView(state) {

    const view = state.isEditable ? new EventEditorView() : new CardView();

    view.classList.add('events-list__item');
    view.setAttribute('role', 'listitem');
    view.state = state;
    view.render();

    return view;
  }
}

customElements.define('trip-event-list', TripEventListView);

export default TripEventListView;

