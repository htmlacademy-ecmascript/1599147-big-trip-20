import { render } from '../render.js';
import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import TripEventItemView from '../view/trip-events-item.js';
import TripEventListView from '../view/trip-events-list';

export default class TripEventListPresenter {

  tripEventListComponent = new TripEventListView();

  constructor({ tripEventContainer }) {
    this.tripEventContainer = tripEventContainer;
  }

  init() {

    render(new SortView(), this.tripEventContainer);
    render(this.tripEventListComponent, this.tripEventContainer);
    render(new EditPointView(), this.tripEventListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new TripEventItemView(), this.tripEventListComponent.getElement());
    }
    render(new AddPointView(), this.tripEventListComponent.getElement());

  }
}
