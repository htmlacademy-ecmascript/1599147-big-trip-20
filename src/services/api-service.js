import Service from './service';

export default class APIService extends Service {

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

  }

  /**
   * @return {Promise<Array<RawTripEventPoint>>}
   */
  async getTripEventPoints() {
    const response = await this.request('big-trip/points');
    return response.json();
  }

  /**
   * @return {Promise<Array<Point>>}
   */
  async getPointsList() {
    const response = await this.request('big-trip/destinations');
    return response.json();
  }

  /**
   * @return {Promise<Array<Offers>>}
   */
  async getOffersList() {
    const response = await this.request('big-trip/offers');
    return response.json();
  }


}
