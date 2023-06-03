/**
 * @typedef {import('flatpickr/dist/types/options.js').Options} FlatpickrOptions
 */

/**
 * @typedef {import('../tools/utils.js').SafeHtml} SafeHtml
 * @typedef {import('../views/add-new-event-view.js').default} AddView
 * @typedef {import('../views/trip-info-view.js').default} TripInfoView
 * @typedef {import('../views/filter-view.js').default} FilterView
 * @typedef {import('../views/sort-view.js').default} SortView
 * @typedef {import('../views/trip-event-list-view.js').default} TripEventListView
 * @typedef {import('../views/card-view.js').default} CardView
 * @typedef {import('../views/view.js').default} View
 * @typedef {import('../views/event-editor-view.js').default} EventEditorView
 * @typedef {import('../views/placeholder-view.js').default} PlaceholderView
 */

/**
 * @typedef {import ('../model/model.js').default} Model
 * @typedef {import ('../model/app-model.js').default} AppModel
 */

/**
 * @typedef RawTripEventPoint
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
 * @typedef TripEventPoint
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
 * @typedef TripInfoState
 * @prop {string} places
 * @prop {string} dates
 * @prop {string} cost
 */

/**
 * @typedef AddNewEventState
 * @prop {boolean} isDisabled
 */

/**
 * @typedef FilterItem
 * @prop {string} type
 * @prop {string} filterDescription
 * @prop {boolean} isSelected
 * @prop {boolean} isDisabled
 */

/**
 * @typedef FilterState
 * @prop {Array<FilterItem>} items
 */

/**
 * @typedef SortItem
 * @prop {string} type
 * @prop {string} sortDescription
 * @prop {boolean} isSelected
 * @prop {boolean} isDisabled
 */

/**
 * @typedef SortState
 * @prop {Array<SortItem>} items
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
 * @prop {Array<Offer & {isSelected?: boolean}>} offerList
 * @prop {boolean} isFavorite
 * @prop {boolean} isEditable
 * @prop {boolean} isDraft
 */

/**
 * @typedef PlaceholderViewState
 * @prop {string} text
 * @prop {boolean} [isHidden]
 */

/**
 * @typedef URLParams
 * @prop {string} [editCardId]
 * @prop {SortType} [sortType]
 * @prop {FilterType} [filterType]
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
 * @typedef EventTypeItem
 * @prop {EventType} type
 * @prop {string} description
 */

/**
 * @typedef {'taxi' | 'bus' | 'train' | 'ship' | 'drive' | 'flight' | 'check-in' | 'sightseeing' | 'restaurant'} EventType
 */

/**
 * @typedef {'everything' | 'future' | 'present' | 'past'} FilterType
 */

/**
 * @typedef {'day' | 'event' | 'time' | 'price' | 'offers'} SortType
 */
