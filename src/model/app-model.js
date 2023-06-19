// @ts-nocheck
import Model from './model';
import {getDuration} from '../tools/utils';


export default class AppModel extends Model {
  /**
   * @type {APIService}
   */
  #apiService;

  /**
   *@type {Array<RawTripEventPoint>}
   */
  #rawTripEventPointsList;

  /**
   * @type {Array<Point>}
   */
  #rawPointList;

  /**
   * @type {Array<Offers>}
   */
  #rawOfferGroups;

  /**
   * @param {APIService} apiService
   */
  constructor(apiService) {
    super();

    this.#apiService = apiService;

  }

  /**
   * @return {Promise<void>}
   */
  async loadData() {
    try {
      const serverData = await Promise.all([
        this.#apiService.getTripEventPoints(),
        this.#apiService.getOffersList(),
        this.#apiService.getPointsList()
      ]);

      const [rawTripEventPointsList, rawOfferGroups, rawPointList] = serverData;

      this.#rawTripEventPointsList = rawTripEventPointsList;
      this.#rawOfferGroups = rawOfferGroups;
      this.#rawPointList = rawPointList;

      this.notify('load');
    } catch (error) {
      this.notify('error', error);
      throw error;
    }
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
   * @param {{filterType?: string, sortType?: SortType}} [criteria]
   * @return {Array<TripEventPoint>}
   */
  getTripEventPoints(criteria = {}) {
    const transformedTripEventPoints = this.#rawTripEventPointsList.map(AppModel.transformTripEventPointToClient);
    const filterCallback = this.#filterCallbackMap[criteria.filterType] ?? this.#filterCallbackMap.everything;
    const sortCallback = this.#sortCallbackMap[criteria.sortType] ?? this.#sortCallbackMap.day;

    return transformedTripEventPoints.filter(filterCallback).sort(sortCallback);
  }

  /**
   * @param {TripEventPoint} tripEventPoint
   */
  async createTripEventPoint(tripEventPoint) {
    try {
      this.notify('modelBusy');
      const rawPoint = (AppModel.transformTripEventPointToServer(tripEventPoint));
      const createdPoint = await this.#apiService.addTripEventPoint(rawPoint);

      this.#rawTripEventPointsList.push(createdPoint);

    } finally {
      this.notify('modelIdle');
    }
  }


  /**
   * @param {TripEventPoint} tripEventPoint
   */
  async updateTripEventPoint(tripEventPoint) {
    try {
      this.notify('modelBusy');

      const rawPoint = (AppModel.transformTripEventPointToServer(tripEventPoint));
      const updatedTripEventPoint = await this.#apiService.updateTripEventPoint(rawPoint);
      const index = this.#rawTripEventPointsList.findIndex((item) => item.id === updatedTripEventPoint.id);

      this.#rawTripEventPointsList.splice(index, 1, updatedTripEventPoint);

    } finally {
      this.notify('modelIdle');
    }
  }

  /**
   * @param {TripEventPoint} tripEventPoint
   */
  async deleteTripEventPoint(tripEventPoint) {
    try {
      this.notify('modelBusy');

      const rawPoint = (AppModel.transformTripEventPointToServer(tripEventPoint));
      await this.#apiService.deleteTripEventPoint(rawPoint.id);
      const index = this.#rawTripEventPointsList.findIndex((item) => item.id === rawPoint.id);

      this.#rawTripEventPointsList.splice(index, 1);

    } finally {
      this.notify('modelIdle');
    }
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
    return structuredClone(this.#rawOfferGroups);
  }

  /**
   * @param {RawTripEventPoint} rawTripEventPoint
   * @return {TripEventPoint}
   */
  static transformTripEventPointToClient(rawTripEventPoint) {
    return {
      id: rawTripEventPoint.id,
      type: rawTripEventPoint.type,
      pointId: rawTripEventPoint.destination,
      startDateTime: rawTripEventPoint.date_from,
      endDateTime: rawTripEventPoint.date_to,
      basePrice: rawTripEventPoint.base_price,
      offersIdList: rawTripEventPoint.offers,
      isFavorite: rawTripEventPoint.is_favorite
    };
  }

  /**
   * @param {TripEventPoint} tripEventPoint
   * @return {RawTripEventPoint}
   */
  static transformTripEventPointToServer(tripEventPoint) {
    return {
      'id': tripEventPoint.id,
      'type': tripEventPoint.type,
      'destination': tripEventPoint.pointId,
      'date_from': tripEventPoint.startDateTime,
      'date_to': tripEventPoint.endDateTime,
      'base_price': tripEventPoint.basePrice,
      'offers': tripEventPoint.offersIdList,
      'is_favorite': tripEventPoint.isFavorite
    };
  }

  /**
   * @param {TripEventPoint} point
   */
  static calcPointDuration(point) {
    return getDuration(point.endDateTime, point.startDateTime);
  }
}
