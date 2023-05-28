// @ts-nocheck
import Model from './model';
import rawEventsList from '../mocks/trip-event-mocks.json';
import rawPointList from '../mocks/point-list-mocks.json';
import rawOfferGroups from '../mocks/offer-list-mocks.json';
import {getDuration} from '../tools/utils';


export default class AppModel extends Model {
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
   * @type {Record<FilterType, (item: EventPoint) => void>}
   */
  #filterCallbackMap = {
    everything: () => true,
    future: (item) => Date.parse(item.startDateTime) > Date.now(),
    present: (item) => (Date.parse(item.startDateTime) < Date.now() && Date.parse(item.endDateTime) > Date.now()),
    past: (item) => Date.parse(item.endDateTime) < Date.now()
  };

  /**
   * @type {Record<SortType, (a: EventPoint, b: EventPoint) => number>}
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
   * @return {Array<EventPoint>}
   */
  getEventPoints(criteria = {}) {
    const transformedEventPoints = this.#rawEventsList.map(AppModel.transformEventPoint);
    const filterCallback = this.#filterCallbackMap[criteria.filterType] ?? this.#filterCallbackMap.everything;
    const sortCallback = this.#sortCallbackMap[criteria.sortType] ?? this.#sortCallbackMap.day;

    return transformedEventPoints.filter(filterCallback).sort(sortCallback);

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
      pointId: eventPoint.destination,
      startDateTime: eventPoint.date_from,
      endDateTime: eventPoint.date_to,
      basePrice: eventPoint.base_price,
      offersIdList: eventPoint.offers,
      isFavorite: eventPoint.is_favorite
    };

  }

  /**
   * @param {EventPoint} point
   */
  static calcPointDuration(point) {
    return getDuration(point.endDateTime, point.startDateTime);
  }
}
