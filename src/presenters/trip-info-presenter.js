import Presenter from './presenter.js';

/**
 * @extends {Presenter<TripInfoView>}
 */
class TripInfoPresenter extends Presenter {
  /**
   * @override
   * @return {TripInfoState}
   */
  createViewState() {
    // TODO: TripInfoState
    return {
      places: 'Dublin — Paris — Bali',
      dates: 'Mar 18 — 20',
      cost: '230'
    };

  }
}

export default TripInfoPresenter;

