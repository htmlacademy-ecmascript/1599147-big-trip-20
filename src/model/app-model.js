// @ts-nocheck
import Model from './model';
import rawEventPointsList from '../mocks/trip-event-mocks.json';
import rawPointList from '../mocks/point-list-mocks.json';
import rawOfferGroups from '../mocks/offer-list-mocks.json';
import {getDuration} from '../tools/utils';


export default class AppModel extends Model {
  #rawEventPointsList;
  #rawPointList;
  #rawOfferGroups;

  constructor() {
    super();
    this.#rawEventPointsList = rawEventPointsList;
    this.#rawOfferGroups = rawOfferGroups;
    this.#rawPointList = rawPointList;
  }

  /**
   * @type {Record<FilterType, (item: TripEventPoint) => void>}
   */
  #filterCallbackMap = {
    everything: () => true,
    future: (item) => Date.parse(item.startDateTime) > Date.now(),
    present: (item) => (Date.parse(item.startDateTime) < Date.now() && Date.parse(item.endDateTime) > Date.now()),
    past: (item) => Date.parse(item.endDateTime) < Date.now()
  };

  /**
   * @type {Record<SortType, (a: TripEventPoint, b: TripEventPoint) => number>}
   */
  #sortCallbackMap = {
    day: (a, b) => Date.parse(a.startDateTime) - Date.parse(b.startDateTime),
    event: () => 0,
    time: (a, b) => AppModel.calcPointDuration(a) - AppModel.calcPointDuration(b),
    price: (a, b) => (b.basePrice - a.basePrice),
    offers: (a, b) => b.offersIdList.length - a.offersIdList.length,
  };

  /**
   * @param {{filterType?: FilterType, sortType?: SortType}} [criteria]
   * @return {Array<TripEventPoint>}
   */
  getTripEventPoints(criteria = {}) {
    const transformedTripEventPoints = this.#rawEventPointsList.map(AppModel.transformTripEventPoint);
    const filterCallback = this.#filterCallbackMap[criteria.filterType] ?? this.#filterCallbackMap.everything;
    const sortCallback = this.#sortCallbackMap[criteria.sortType] ?? this.#sortCallbackMap.day;

    return transformedTripEventPoints.filter(filterCallback).sort(sortCallback);

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
   * @param {RawTripEventPoint} tripEventPoint
   * @return {TripEventPoint}
   */
  static transformTripEventPoint(tripEventPoint) {
    return {
      id: tripEventPoint.id,
      type: tripEventPoint.type,
      pointId: tripEventPoint.destination,
      startDateTime: tripEventPoint.date_from,
      endDateTime: tripEventPoint.date_to,
      basePrice: tripEventPoint.base_price,
      offersIdList: tripEventPoint.offers,
      isFavorite: tripEventPoint.is_favorite
    };

  }

  /**
   * @param {TripEventPoint} point
   */
  static calcPointDuration(point) {
    return getDuration(point.endDateTime, point.startDateTime);
  }
}
