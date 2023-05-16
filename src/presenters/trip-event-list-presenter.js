import Presenter from './presenter.js';
import {formatDate} from '../tools/utils.js';
import {formatTime} from '../tools/utils.js';
import {formatDuration} from '../tools/utils.js';
import {EVENT_TYPES_LIST} from '../config/event-types.config.js';


/**
 * @extends {Presenter<TripEventListView, AppModel>}
 */
class TripEventListPresenter extends Presenter {
  /**
   * @override
   * @return {EventListViewState}
   */
  createViewState() {

    const eventPoints = this.model.getEventPoints();
    const items = eventPoints.map((value) => this.createEventViewState(value));

    return {items};
  }

  /**
   * @param {EventPoint} tripEventItem
   * @return {EventViewState}
   */
  createEventViewState(tripEventItem) {

    const getEventDescription = (item) => EVENT_TYPES_LIST.find((value) => (value.type === item.type)).description;

    const offerGroups = this.model.getOfferGroups();
    const points = this.model.getPoints();

    const eventTypeList = offerGroups.map((item) => ({
      value: item.type,
      description: getEventDescription(item),
      isSelected: item.type === tripEventItem.type
    }));

    const pointList = points.map((item) => ({
      ...item,
      isSelected: item.id === tripEventItem.pointId
    }));

    const offers = offerGroups.find((item) => item.type === tripEventItem.type).offers;

    const offerList = offers.map((item) => ({...item, isSelected: tripEventItem.offersIdList.includes(item.id)}));

    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

    return {
      id: tripEventItem.id,
      eventTypeList,
      pointList,
      startDateTime: tripEventItem.startDateTime,
      endDateTime: tripEventItem.endDateTime,
      startDate: formatDate(tripEventItem.startDateTime),
      endDate: formatDate(tripEventItem.endDateTime),
      startTime:formatTime(tripEventItem.startDateTime),
      endTime: formatTime(tripEventItem.endDateTime),
      duration: formatDuration(tripEventItem.startDateTime, tripEventItem.endDateTime),
      basePrice: tripEventItem.basePrice,
      offerList,
      isFavorite: tripEventItem.isFavorite,
      isEditable: tripEventItem.id === urlParams.editCardId
    };
  }

  /**
   * @override
   */
  createEventListeners() {

    /**
     * @param {CustomEvent & {target: CardView}} evt
     */
    const handleCardOpen = (evt) => {

      /**
       * @type {URLParams}
       */
      const urlParams = this.getUrlParams();

      urlParams.editCardId = evt.target.state.id;
      this.setUrlParams(urlParams);

    };

    const handleCardClose = () => {

      /**
       * @type {URLParams}
       */
      const urlParams = this.getUrlParams();

      delete urlParams.editCardId;
      this.setUrlParams(urlParams);

    };

    /**
     * @param {CustomEvent & {target: CardView}} evt
     */
    const handleFavorite = (evt) => {
      this.toggleFavoriteCard(evt.target);
    };

    this.view.addEventListener('openCard', handleCardOpen);
    this.view.addEventListener('closeCard', handleCardClose);
    this.view.addEventListener('favorite', handleFavorite);

  }

  /**
   * @param {CardView} card
   */
  toggleFavoriteCard(card) {
    card.state.isFavorite = !card.state.isFavorite;
    card.render();
  }

}

export default TripEventListPresenter;

