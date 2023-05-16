import {FILTER_LIST} from '../config/filter.config.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<FilterView>}
 */
class FilterPresenter extends Presenter {

  /**
   * @override
   * @return {FilterState}
   */
  createViewState() {
    // TODO: FilterViewState

    const filterDetails = Object.entries(FILTER_LIST);

    /**
     * @return {Array<FilterItem>}
     */
    const items = filterDetails.map(([type, filterDescription]) => ({
      type,
      filterDescription,
      isSelected: false,
      isDisabled: false
    }));
    return {items};

  }
}

export default FilterPresenter;
