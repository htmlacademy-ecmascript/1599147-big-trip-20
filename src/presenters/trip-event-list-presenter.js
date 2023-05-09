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
    const items = eventPoints.map((value, index) => this.createEventViewState(value, index));

    return {items};
  }

  /**
   * @param {EventPoint} eventItem
   * @return {EventViewState}
   */
  createEventViewState(eventItem, index) {

    const getEventDescription = (item) => EVENT_TYPES_LIST.find((value) => (value.type === item.type)).description;

    const offerGroups = this.model.getOfferGroups();
    const points = this.model.getPoints();

    const eventTypeList = offerGroups.map((item) => ({
      value: item.type,
      description: getEventDescription(item),
      isSelected: item.type === eventItem.type
    }));

    const pointList = points.map((item) => ({
      ...item,
      isSelected: item.id === eventItem.pointId
    }));

    const offers = offerGroups.find((item) => item.type === eventItem.type).offers;

    const offerList = offers.map((item) => ({...item, isSelected: eventItem.offersIdList.includes(item.id)}));

    return {
      id: eventItem.id,
      eventTypeList,
      pointList,
      startDateTime: eventItem.startDateTime,
      endDateTime: eventItem.endDateTime,
      startDate: formatDate(eventItem.startDateTime),
      endDate: formatDate(eventItem.endDateTime),
      startTime:formatTime(eventItem.startDateTime),
      endTime: formatTime(eventItem.endDateTime),
      duration: formatDuration(eventItem.startDateTime, eventItem.endDateTime),
      basePrice: eventItem.basePrice,
      offerList,
      isFavorite: eventItem.isFavorite,
      isEditable: index === 2
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
      console.log(evt.target.state);
      console.log(evt.target);
    };

    this.view.addEventListener('open', handleCardOpen);
  }

}

export default TripEventListPresenter;

