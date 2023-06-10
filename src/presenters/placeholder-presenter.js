import {PLACEHOLDER_TEXT_LIST} from '../config/placeholder-text.config.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<PlaceholderView, AppModel>}
 */
class PlaceholderPresenter extends Presenter {

  /**
   * @type {boolean}
   */
  isLoaded;

  /**
   * @override
   */
  createEventListeners() {
    this.model.addEventListener('load', this.handleModelLoaded.bind(this));
  }

  handleModelLoaded() {
    this.isLoaded = true;
    this.updateView();
  }

  /**
   * @override
   * @return {PlaceholderViewState}
   */
  createViewState() {
    if (this.isLoaded) {
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
    return {
      text: PLACEHOLDER_TEXT_LIST.loadProcessing
    };
  }
}

export default PlaceholderPresenter;

