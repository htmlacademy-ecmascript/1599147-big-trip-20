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
    // TODO: AddNewEventViewState
    return {
      isDisabled: true
    };
  }
}

export default AddNewEventPresenter;

