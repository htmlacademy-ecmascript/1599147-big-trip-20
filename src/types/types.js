/**
 * @typedef {import('../tools/utils.js').SafeHtml} SafeHtml
 * @typedef {import('../views/add-new-event-view.js').default} AddView
 * @typedef {import('../views/trip-info-view.js').default} TripInfoView
 * @typedef {import('../views/filter-view.js').default} FilterView
 * @typedef {import('../views/sort-view.js').default} SortView
 * @typedef {import('../views/trip-event-list-view.js').default} TripEventListView
 * @typedef {import('../views/card-view.js').default} CardView
 * @typedef {import('../views/view.js').default} View
 */

/**
 * @typedef {import ('../model/model.js').default} Model
 * @typedef {import ('../model/app-model.js').default} AppModel
 */

/**
 * @typedef RawEventPoint
 * @prop {string} id
 * @prop {EventType} type
 * @prop {string} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {Array<string>} offers
 * @prop {boolean} is_favorite
 */

/**
 * @typedef EventPoint
 * @prop {string} id
 * @prop {EventType} type
 * @prop {string} pointId
 * @prop {string} startDateTime
 * @prop {string} endDateTime
 * @prop {number} basePrice
 * @prop {Array<string>} offersIdList
 * @prop {boolean} isFavorite
 */

/**
 * @typedef EventListViewState
 * @prop {Array<EventViewState>} items
 */

/**
 * @typedef EventViewState
 * @prop {string} id
 * @prop {Array<{value: EventType, description: string, isSelected: boolean}>} eventTypeList
 * @prop {Array<Point & {isSelected: boolean}>} pointList
 * @prop {string} startDateTime
 * @prop {string} endDateTime
 * @prop {string} startDate
 * @prop {string} endDate
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} duration
 * @prop {number} basePrice
 * @prop {Array<Offer & {isSelected: boolean}>} offerList
 * @prop {boolean} isFavorite
 * @prop {boolean} isEditable
 */

/**
 * @typedef Point
 * @prop {string} id
 * @prop {string} description
 * @prop {string} name
 * @prop {Array<Picture>} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef Offers
 * @prop {EventType} type
 * @prop {Array<Offer>} offers
 */

/**
 * @typedef Offer
 * @prop {string} id
 * @prop {string} title
 * @prop {string} price
 */

/**
 * @typedef {'taxi' | 'bus' | 'train' | 'ship' | 'drive' | 'flight' | 'check-in' | 'sightseeing' | 'restaurant'} EventType
 */
