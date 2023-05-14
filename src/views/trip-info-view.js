import View from './view.js';
import {html} from '../tools/utils.js';

/**
 * @extends {View<TripInfoState>}
 */
class TripInfoView extends View {
  constructor() {
    super();

    this.classList.add('trip-info');
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this.state.places}</h1>
        <p class="trip-info__dates">${this.state.dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${this.state.cost}</span>
      </p>
    `;
  }
}

customElements.define('trip-info-view', TripInfoView);

export default TripInfoView;

