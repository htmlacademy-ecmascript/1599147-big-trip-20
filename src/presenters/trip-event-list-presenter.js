import Presenter from './presenter.js';
import {formatDate} from '../tools/utils.js';
import {formatTime} from '../tools/utils.js';
import {formatDuration} from '../tools/utils.js';
import {EVENT_TYPES_LIST} from '../config/event-types.config.js';
import EventEditorView from '../views/event-editor-view.js';


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


    const eventPoints = this.model.getEventPoints(urlParams);
    const items = eventPoints.map((value) => this.createEventViewState(value));

    return {items};
  }

  /**
   * @param {EventPoint} tripEventItem
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
   * @override
   */
  createEventListeners() {

    this.view.addEventListener('openCard', this.handleCardOpen.bind(this));
    this.view.addEventListener('closeCard', this.handleCardClose.bind(this));
    this.view.addEventListener('favorite', this.handleFavorite.bind(this));
    this.view.addEventListener('edit', this.handleEdit.bind(this));

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

  handleCardClose() {

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
      case 'event-destination':
        tripEventPoint.pointList.forEach((item) => {
          item.isSelected = item.name === editedField.value.trim();
        });
        editorItem.renderDestinationDetails();
        break;
    }
  }
}


export default TripEventListPresenter;

