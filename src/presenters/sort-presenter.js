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
    // TODO: SortViewState

    const sortDetails = Object.entries(SORT_LIST);

    /**
     * @return {Array<FilterItem>}
     */
    const items = sortDetails.map(([type, sortDescription]) => ({
      type,
      sortDescription,
      isSelected: false,
      isDisabled: false
    }));
    return {items};
  }
}

export default SortPresenter;

