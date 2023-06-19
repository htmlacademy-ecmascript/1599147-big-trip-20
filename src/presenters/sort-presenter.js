import {SORT_LIST, DEFAULT_SORT, DISABLED_SORT_ITEMS} from '../config/sort.config.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<SortView, AppModel>}
 */
class SortPresenter extends Presenter {

  /**
   * @override
   * @return {SortState}
   */
  createViewState() {
    const sortDetails = Object.entries(SORT_LIST);
    const {sortType = DEFAULT_SORT, filterType} = this.getUrlParams();
    const tripEventPoints = this.model.getTripEventPoints({filterType});

    /**
     * @return {Array<SortItem>}
     */
    const items = tripEventPoints.length ? sortDetails.map(([type, sortDescription]) => ({
      type,
      sortDescription,
      isSelected: type === sortType,
      isDisabled: DISABLED_SORT_ITEMS.includes(type)
    })) : [];
    return {items};
  }

  /**
   * @override
   */
  createEventListeners() {

    this.view.addEventListener('change', this.handleSortChange.bind(this));
  }

  /**
   * @param {Event & {target: {value: SortType}}} evt
   */
  handleSortChange(evt) {

    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

    urlParams.sortType = evt.target.value;
    delete urlParams.editCardId;
    this.setUrlParams(urlParams);
  }

}

export default SortPresenter;

