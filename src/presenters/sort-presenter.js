import {SORT_LIST} from '../config/sort.config.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<SortView>}
 */
class SortPresenter extends Presenter {
  /**
   * @override
   * @return {SortState}
   */
  createViewState() {
    const sortDetails = Object.entries(SORT_LIST);
    const {sortType = 'day'} = this.getUrlParams();

    /**
     * @return {Array<FilterItem>}
     */
    const items = sortDetails.map(([type, sortDescription]) => ({
      type,
      sortDescription,
      isSelected: type === sortType,
      isDisabled: false
    }));
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
