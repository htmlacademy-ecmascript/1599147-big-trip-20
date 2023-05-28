import {PLACEHOLDER_TEXT_LIST} from '../config/placeholder-text.config.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<PlaceholderView, AppModel>}
 */
class PlaceholderPresenter extends Presenter {
  /**
   * @override
   * @return {PlaceholderViewState}
   */
  createViewState() {
    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

    const tripEvents = this.model.getTripEventPoints(urlParams);

    return {
      text: PLACEHOLDER_TEXT_LIST[urlParams.filterType] ?? PLACEHOLDER_TEXT_LIST.everything,
      isHidden: tripEvents.length > 0
    };
  }
}

export default PlaceholderPresenter;

