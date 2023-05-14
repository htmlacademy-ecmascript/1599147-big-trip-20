import View from './view.js';
import {html} from '../tools/utils.js';

/**
 * @extends View<AddNewEventState>
 */
class AddView extends View {

  /**
   * @override
   */
  createHtml() {
    return html`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${this.state.isDisabled ? 'disabled' : ''}>New event</button>`;
  }
}

customElements.define('add-event-view', AddView);

export default AddView;

