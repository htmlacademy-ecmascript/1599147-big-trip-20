import Presenter from './presenter.js';
import {formatDate} from '../tools/utils.js';
import {formatTime} from '../tools/utils.js';
import { formatDuration } from '../tools/utils.js';

/**
 * @extends {Presenter<TripEventListView, AppModel>}
 */
class TripEventListPresenter extends Presenter {
  /**
   * @override
   * @return {EventListViewState}
   */
  createViewState() {
    // тут создаем обогащенный набор данных, который подходит для строки и для формы редактирования и "раскрывает" все id в нужный нам список
    // 1. описываем тип для одного события и для списка событий
    // 2. регистрируем этот тип во вью
    // 3. нужны два метода - формирование события в точке и формирование списка событий по путешествию.  делаем оба на основе данных из модели.
    //

    const eventPoints = this.model.getEventPoints();
    // 3.2 - метод формирования списка точек
    const items = eventPoints.map((value, index) => this.createEventViewState(value, index));
    // const items = eventPoints.map(this.createEventViewState, this);
    // console.log(eventPoints);
    // console.log(items);

    return {items};
  }

  /**
   * @param {EventPoint} eventItem
   * @return {EventViewState}
   */
  createEventViewState(eventItem, index) {
    // 3.1 - формирование данных для события в точке

    const offerGroups = this.model.getOfferGroups();
    const points = this.model.getPoints();

    const eventTypeList = offerGroups.map((item) => ({
      value: item.type,
      isSelected: item.type === eventItem.type
    }));

    const pointList = points.map((item) => ({
      ...item,
      isSelected: item.id === eventItem.pointId
    }));

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
      offerList: [],
      isFavorite: eventItem.isFavorite,
      isEditable: index === 0
    };
  }
}

export default TripEventListPresenter;

