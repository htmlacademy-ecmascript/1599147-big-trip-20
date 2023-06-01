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

    return {
      isDisabled: true
    };
  }
}

export default AddNewEventPresenter;

