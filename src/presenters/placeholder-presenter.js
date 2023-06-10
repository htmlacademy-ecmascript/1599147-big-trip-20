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
   * @type {Error}
   */
  isLoadError;

  /**
   * @override
   */
  createEventListeners() {
    this.model.addEventListener('load', this.handleModelLoaded.bind(this));
    this.model.addEventListener('error', this.handleModelLoadError.bind(this));
  }

  handleModelLoaded() {
    this.isLoaded = true;
    this.updateView();
  }

  /**
   *
   * @param {CustomEvent<Error>} error
   */
  handleModelLoadError(error) {
    this.isLoadError = error.detail;
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
    if (this.isLoadError) {
      return {
        text: String(this.isLoadError)
      };
    }
    return {
      text: PLACEHOLDER_TEXT_LIST.loadProcessing
    };
  }
}

export default PlaceholderPresenter;

