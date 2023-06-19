import Presenter from './presenter.js';
import {formatDate, formatTime, formatDuration} from '../tools/utils.js';
import {EVENT_TYPES_LIST} from '../config/event-types.config.js';
import {NEW_TRIP_EVENT_STATE} from '../config/new-event-point.template.js';

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

    if (urlParams.editCardId === 'draft') {
      const draftPoint = NEW_TRIP_EVENT_STATE;
      items.unshift(this.createEventViewState(draftPoint));
    }

    return {items};
  }

  /**
   * @param {Partial<TripEventPoint>} tripEventItem
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

    const isDraft = tripEventItem.id === undefined;
    const isEditable = isDraft || tripEventItem.id === urlParams.editCardId;

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
      isEditable,
      isDraft,
    };
  }

  /**
   * @param {EventViewState} pointState
   * @return {TripEventPoint}
   */
  createSerializedPoint(pointState) {
    const selectedPoint = pointState.pointList.find((item) => item.isSelected === true);

    return {
      id: pointState.id,
      type: pointState.eventTypeList.find((item) => item.isSelected === true).value,
      pointId: selectedPoint ? selectedPoint.id : '',
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
    this.view.addEventListener('delete', this.handleDelete.bind(this));
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
  async handleFavorite(evt) {
    const card = evt.target;
    try {
      card.state.isFavorite = !card.state.isFavorite;
      await this.model.updateTripEventPoint(this.createSerializedPoint(card.state));
      card.render();

    } catch (error) {
      card.shake();
    }
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
   * @param {CustomEvent & {target: EventEditorView}} evt
   */
  async handleSave(evt) {

    const card = evt.target;

    try {
      evt.preventDefault();
      card.state.isSaving = true;
      card.renderSubmitButton();

      if (card.state.isDraft) {
        await this.model.createTripEventPoint(this.createSerializedPoint(card.state));
      } else {
        await this.model.updateTripEventPoint(this.createSerializedPoint(card.state));
      }

      this.handleCardClose(evt);

    } catch (error) {
      card.state.isSaving = false;
      card.renderSubmitButton();
      card.shake();
    }
  }

  /**
   * @param {CustomEvent & {target: EventEditorView}} evt
   */
  async handleDelete(evt) {
    const card = evt.target;

    try {
      evt.preventDefault();
      card.state.isDeleting = true;
      card.renderResetButton();

      await this.model.deleteTripEventPoint(this.createSerializedPoint(card.state));
      this.handleCardClose(evt);

    } catch(error) {
      card.state.isDeleting = false;
      card.renderResetButton();
      card.shake();
    }

  }
}

export default TripEventListPresenter;
