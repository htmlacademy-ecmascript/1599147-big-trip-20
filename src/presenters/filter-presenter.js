import {FILTER_LIST, DEFAULT_FILTER} from '../config/filter.config.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<FilterView, AppModel>}
 */
class FilterPresenter extends Presenter {

  /**
   * @override
   * @return {FilterState}
   */
  createViewState() {

    const filterDetails = Object.entries(FILTER_LIST);

    /**
     * @type {URLParams}
     */
    const {filterType = DEFAULT_FILTER } = this.getUrlParams();

    /**
     * @return {Array<FilterItem>}
     */
    const items = filterDetails.map(([type, filterDescription]) => ({

      type,
      filterDescription,
      isSelected: type === filterType,
      isDisabled: this.model.getTripEventPoints({filterType: type}).length === 0
    }));
    return {items};

  }

  /**
   * @override
   */
  createEventListeners() {

    this.view.addEventListener('change', this.handleFilterChange.bind(this));
  }

  /**
   * @param {Event & {target: {value: FilterType}}} evt
   */
  handleFilterChange(evt) {

    /**
     * @type {URLParams}
     */
    const urlParams = {filterType: evt.target.value};
    this.setUrlParams(urlParams);
  }

}

export default FilterPresenter;
