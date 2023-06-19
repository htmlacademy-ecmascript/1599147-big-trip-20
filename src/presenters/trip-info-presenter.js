import {formatRange} from '../tools/utils.js';
import Presenter from './presenter.js';

/**
 * @extends {Presenter<TripInfoView, AppModel>}
 */
class TripInfoPresenter extends Presenter {
  /**
   * @override
   * @return {TripInfoState}
   */
  createViewState() {
    this.getPlaces();
    return {
      places:  this.getPlaces(),
      dates: this.getDates(),
      cost: this.getCost()
    };

  }

  /**
   * @override
   */
  handleWindowPopState() { }

  /**
   * @override
   */
  createEventListeners() {
    this.model.addEventListener('modelChange', this.handleModelChange.bind(this));
  }

  handleModelChange() {
    this.updateView();
  }

  /**
   * @return {string}
   */
  getPlaces() {
    const tripEventPoints = this.model.getTripEventPoints();
    const allPointList = this.model.getPoints();

    const tripPointList = tripEventPoints.map((tripEvent) => {
      const eventPoint = allPointList.find((item) => item.id === tripEvent.pointId);
      return eventPoint.name;
    });

    const normalizePointList = tripPointList.filter((item, index, arr) =>
      item !== arr[index + 1]
    );

    if (normalizePointList.length > 3) {
      normalizePointList.splice(1, normalizePointList.length - 2, '...');
    }

    return normalizePointList.join(' — ');

  }

  /**
   * @return {string}
   */
  getDates() {
    const tripEventPoints = this.model.getTripEventPoints();
    const tripStartTime = tripEventPoints.at(0).startDateTime;
    const tripStopTime = tripEventPoints.at(-1).endDateTime;

    return formatRange(tripStartTime, tripStopTime);

  }

  /**
   * @return {number}
   */
  getCost() {
    const tripEventPoints = this.model.getTripEventPoints();
    const offerGroups = this.model.getOfferGroups();


    return tripEventPoints.reduce((totalCost, point) => {
      const {offers} = offerGroups.find((item) => item.type === point.type);

      const pointCost = offers.reduce((cost, offer) => {
        if (point.offersIdList.includes(offer.id)) {
          return cost + offer.price;
        }
        return cost;
      }, point.basePrice);

      return totalCost + Number(pointCost);
    }, 0);

  }

}

export default TripInfoPresenter;

