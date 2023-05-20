import View from './view.js';
import {html} from '../tools/utils.js';

/**
 * @extends View<SortState>
 */
class SortView extends View {

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        ${this.state.items.map((item) => html`
        <div class="trip-sort__item  trip-sort__item--${item.type}">
          <input id="sort-${item.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${item.type}" ${item.isSelected ? 'checked' : ''} ${item.isDisabled ? 'disabled' : ''}>
          <label class="trip-sort__btn" for="sort-${item.type}">${item.sortDescription}</label>
        </div>
        `)}
      </form>
    `;
  }
}

customElements.define('sort-view', SortView);

export default SortView;

