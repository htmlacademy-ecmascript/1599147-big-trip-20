import './views/add-new-event-view.js';
import './views/trip-info-view.js';
import './views/filter-view.js';
import './views/sort-view.js';
import './views/trip-event-list-view.js';
import './views/placeholder-view.js';

import AppModel from './model/app-model.js';
import TripInfoPresenter from './presenters/trip-info-presenter.js';
import AddNewEventPresenter from './presenters/add-new-event-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import TripEventListPresenter from './presenters/trip-event-list-presenter.js';
import PlaceholderPresenter from './presenters/placeholder-presenter.js';

const appModel = new AppModel();

const header = document.querySelector('.page-header');
const mainPage = document.querySelector('.page-main');

new TripInfoPresenter(header.querySelector('trip-info-view'));
new AddNewEventPresenter(header.querySelector('add-event-view'));
new FilterPresenter(header.querySelector('filter-view'));
new SortPresenter(mainPage.querySelector('sort-view'));
new TripEventListPresenter(mainPage.querySelector('trip-event-list'), appModel);
new PlaceholderPresenter(mainPage.querySelector('placeholder-view'), appModel);
