import View from './view.js';
import {html} from '../tools/utils.js';

/**
 * @extends View<FilterState>
 */
class FilterView extends View {

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="trip-filters" action="#" method="get">
      ${this.state.items.map((item) => html`
        <div class="trip-filters__filter">
          <input id="filter-${item.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${item.type} ${item.isSelected ? 'checked' : ''} ${item.isDisabled ? 'disabled' : ''}>
          <label class="trip-filters__filter-label" for="filter-${item.type}">${item.filterDescription}</label>
        </div>
      `)}

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }
}

customElements.define('filter-view', FilterView);

export default FilterView;

