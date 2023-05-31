import Presenter from './presenter.js';
import {formatDate, formatTime, formatDuration} from '../tools/utils.js';
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
    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();


    const tripEventPoints = this.model.getTripEventPoints(urlParams);
    const items = tripEventPoints.map((value) => this.createEventViewState(value));

    return {items};
  }

  /**
   * @param {TripEventPoint} tripEventItem
   * @return {EventViewState}
   */
  createEventViewState(tripEventItem) {
    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

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
   *
   * @param {EventViewState} pointState
   * @return {TripEventPoint}
   */
  createSerializedPoint(pointState) {

    return {
      id: pointState.id,
      type: pointState.eventTypeList.find((item) => item.isSelected === true).value,
      pointId: pointState.pointList.find((item) => item.isSelected === true).id,
      startDateTime: pointState.startDateTime,
      endDateTime: pointState.endDateTime,
      basePrice: pointState.basePrice,
      offersIdList: pointState.offerList.filter((item) => item.isSelected === true).map((item) => item.id),
      isFavorite: pointState.isFavorite
    };
  }


  /**
   * @override
   */
  createEventListeners() {

    this.view.addEventListener('openCard', this.handleCardOpen.bind(this));
    this.view.addEventListener('closeCard', this.handleCardClose.bind(this));
    this.view.addEventListener('favorite', this.handleFavorite.bind(this));
    this.view.addEventListener('edit', this.handleEdit.bind(this));
    this.view.addEventListener('save', this.handleSave.bind(this));

  }

  /**
   * @param {CustomEvent & {target: CardView}} evt
   */
  handleCardOpen(evt) {

    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

    urlParams.editCardId = evt.target.state.id;
    this.setUrlParams(urlParams);

  }

  /**
   * @param {CustomEvent} evt
   */
  handleCardClose(evt) {

    evt.preventDefault();

    /**
     * @type {URLParams}
     */
    const urlParams = this.getUrlParams();

    delete urlParams.editCardId;
    this.setUrlParams(urlParams);

  }

  /**
   * @param {CustomEvent & {target: CardView}} evt
   */
  handleFavorite(evt) {
    const card = evt.target;
    card.state.isFavorite = !card.state.isFavorite;
    this.model.updateTripEventPoint(this.createSerializedPoint(card.state));
    card.render();
  }

  /**
   * @param {CustomEvent<HTMLInputElement> & {target: EventEditorView}} evt
   */
  handleEdit(evt) {

    const editorItem = evt.target;
    const editedField = evt.detail;
    const tripEventPoint = editorItem.state;

    switch (editedField.name) {
      case 'event-type': {
        const offerGroups = this.model.getOfferGroups();
        const {offers} = offerGroups.find((item) => item.type === editedField.value);
        tripEventPoint.offerList = offers;

        tripEventPoint.eventTypeList.forEach((item) => {
          item.isSelected = item.value === editedField.value;
        });

        editorItem.renderEventTypeRelatedDetails();
        break;
      }
      case 'event-destination': {
        tripEventPoint.pointList.forEach((item) => {
          item.isSelected = item.name === editedField.value.trim();
        });
        editorItem.renderDestinationDetails();
        break;
      }
      case 'event-start-time': {
        tripEventPoint.startDateTime = editedField.value;
        break;
      }
      case 'event-end-time': {
        tripEventPoint.endDateTime = editedField.value;
        break;
      }
      case 'event-price': {
        tripEventPoint.basePrice = Number(editedField.value);
        break;
      }
      case 'event-offer': {
        const changedOffer = tripEventPoint.offerList.find((item) => item.id === editedField.value);

        changedOffer.isSelected = !changedOffer.isSelected;
        break;
      }

      default: break;
    }
  }

  /**
   *
   * @param {CustomEvent & {target: EventEditorView}} evt
   */
  handleSave(evt) {
    evt.preventDefault();
    const card = evt.target;
    this.model.updateTripEventPoint(this.createSerializedPoint(card.state));
    this.handleCardClose(evt);

  }
}

export default TripEventListPresenter;
