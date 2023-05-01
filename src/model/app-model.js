// @ts-nocheck
import Model from './model';
import rawEventsList from '../mocks/trip-event-mocks.json';
import rawPointList from '../mocks/point-list-mocks.json';
import rawOfferGroups from'../mocks/offer-list-mocks.json';

export default class AppModel extends Model {
  // объявление приватных свойств
  #rawEventsList;
  #rawPointList;
  #rawOfferGroups;

  constructor() {
    super();
    this.#rawEventsList = rawEventsList;
    this.#rawOfferGroups = rawOfferGroups;
    this.#rawPointList = rawPointList;
  }

  /**
   * @return {Array<EventPoint>}
   */
  getEventPoints() {
    return this.#rawEventsList.map(AppModel.transformEventPoint);
  }

  /**
  * @return {Array<Point>}
  */
  getPoints() {
    return structuredClone(this.#rawPointList);
  }

  /**
   * @return {Array<Offers>}
   */
  getOfferGroups() {
  // @ts-ignore
    return structuredClone(this.#rawOfferGroups);
  }

  /**
   * @param {RawEventPoint} eventPoint
   * @return {EventPoint}
   */
  static transformEventPoint(eventPoint) {
    return {
      id: eventPoint.id,
      type: eventPoint.type,
      destinationId: eventPoint.destination,
      startDateTime: eventPoint.date_from,
      endDateTime: eventPoint.date_to,
      basePrice: eventPoint.base_price,
      offersIdList: eventPoint.offers,
      isFavorite: eventPoint.is_favorite
    };

  }

}
