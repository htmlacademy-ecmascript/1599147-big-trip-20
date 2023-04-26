import {render} from './render.js';
import FilterView from './view/filter-view.js';
import TripEventListPresenter from './presenter/trip-list-presenter.js';


const siteHeaderElement = document.querySelector('.page-header');
const headerFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const mainPageElement = document.querySelector('.page-main');
const tripEventsListElement = mainPageElement.querySelector('.trip-events');
const tripEventListPresenter = new TripEventListPresenter({ tripEventContainer: tripEventsListElement });

render(new FilterView(), headerFilterElement);

tripEventListPresenter.init();

