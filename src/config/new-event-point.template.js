// @ts-nocheck
import {EVENT_TYPES_LIST} from './event-types.config';

/**
 * @type {Partial<TripEventPoint>}
 */
export const NEW_TRIP_EVENT_STATE = {
  type: EVENT_TYPES_LIST[0].type,
  offersIdList: [],
  isFavorite: false
};
