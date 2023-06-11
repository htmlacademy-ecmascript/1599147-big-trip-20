/**
 * @type{Partial<ServiceOptions>}
 */
export const API_CONFIG = {
  baseUrl: 'https://20.ecmascript.pages.academy/big-trip',
  authorization: 'Basic fwWV4@#%FCFEffwRiylS'
};

/**
 * @type {Record<string, Partial<HTTPRequestOptions>>}
 */
export const HTTP_REQ_PARAM = {
  getTripEventParam: {
    path: 'big-trip/points',
  },
  addTripEventParam: {
    path: 'big-trip/points',
    init: {
      method: 'post',
      headers: {'content-type': 'application/json'}
    }
  },
  updateTripEventParam: {
    path: 'big-trip/points',
    init: {
      method: 'put',
      headers: {'content-type': 'application/json'}
    }
  },
  deleteTripEventParam: {
    path: 'big-trip/points',
    init: {
      method: 'delete'
    }
  },
  getPointsListParam: {
    path: 'big-trip/destinations',
  },
  getOffersListParam: {
    path: 'big-trip/offers',
  }
};
