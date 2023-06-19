import Presenter from './presenter.js';

/**
 * @extends {Presenter<OverlayView, AppModel>}
 */
class OverlayPresenter extends Presenter {

  /**
   * @type {boolean}
   */
  #isBusy;

  /**
   * @override
   */
  createEventListeners() {
    this.model.addEventListener('modelBusy', this.handleModelBusy.bind(this));
    this.model.addEventListener('modelIdle', this.handleModelIdle.bind(this));
  }

  /**
   * @override
   */
  createViewState() {

    return {
      isActive: this.#isBusy
    };
  }

  handleModelBusy() {
    this.#isBusy = true;
    this.updateView();
  }

  handleModelIdle() {
    this.#isBusy = false;
    this.updateView();
  }

}

export default OverlayPresenter;

