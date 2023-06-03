import View from './view.js';
import {html} from '../tools/utils.js';


/**
 * @extends {View<PlaceholderViewState>}
 */
class PlaceholderView extends View {

  /**
   * @override
   */
  createHtml() {
    const placeholderState = this.state;

    return html`
       <p class="trip-events__msg" ${placeholderState.isHidden ? 'hidden' : ''}>${placeholderState.text}</p>
    `;
  }
}

customElements.define('placeholder-view', PlaceholderView);

export default PlaceholderView;
