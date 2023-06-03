import Presenter from './presenter.js';

/**
 * @extends {Presenter<AddView>}
 */
class AddNewEventPresenter extends Presenter {
  /**
   * @override
   * @return {AddNewEventState}
   */
  createViewState() {

    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

    return {
      isDisabled: urlParams.editCardId === 'draft'
    };
  }

  /**
   * @override
   */
  createEventListeners() {

    this.view.addEventListener('click', this.handleAddNewClick.bind(this));
  }

  handleAddNewClick() {

    /**
     * @type {URLParams}
     */
    const urlParams = {editCardId: 'draft'};

    this.setUrlParams(urlParams);
  }

}

export default AddNewEventPresenter;

