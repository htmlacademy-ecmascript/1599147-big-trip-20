import {HTTP_REQ_PARAM} from '../config/api.config';
import Service from './service';

export default class APIService extends Service {

  #httpReqInit = {};

  /**
   * @param {Partial<ServiceOptions>} options
   */
  constructor(options) {
    super({
      baseUrl: '',
      minResponseTime: 500,
      authorization: '',
      ...options
    });
    this.#httpReqInit = HTTP_REQ_PARAM;
  }

  /**
   * @return {Promise<Array<RawTripEventPoint>>}
   */
  async getTripEventPoints() {
    const response = await this.request(this.#httpReqInit.getTripEventParam.path);
    return response.json();
  }

  /**
   * @param {RawTripEventPoint} point
   * @return {Promise<RawTripEventPoint>}
   */
  async addTripEventPoint(point) {
    const response = await this.request(this.#httpReqInit.addTripEventParam.path, {
      ...this.#httpReqInit.addTripEventParam.init, body: JSON.stringify(point)
    });
    return response.json();
  }

  /**
   * @param {RawTripEventPoint} point
   * @return {Promise<RawTripEventPoint>}
   */
  async updateTripEventPoint(point) {
    const response = await this.request(`${this.#httpReqInit.updateTripEventParam.path}/${point.id}`, {
      ...this.#httpReqInit.updateTripEventParam.init, body: JSON.stringify(point)
    });
    return response.json();
  }

  /**
   * @param {string} pointId
   * @return {Promise<void>}
   */
  async deleteTripEventPoint(pointId) {
    await this.request(`${this.#httpReqInit.deleteTripEventParam.path}/${pointId}`, {
      ...this.#httpReqInit.deleteTripEventParam.init
    });
  }

  /**
   * @return {Promise<Array<Point>>}
   */
  async getPointsList() {
    const response = await this.request(`${this.#httpReqInit.getPointsListParam.path}`);
    return response.json();
  }

  /**
   * @return {Promise<Array<Offers>>}
   */
  async getOffersList() {
    const response = await this.request(`${this.#httpReqInit.getOffersListParam.path}`);
    return response.json();
  }


}
