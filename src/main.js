import './views/add-new-event-view.js';
import './views/trip-info-view.js';
import './views/filter-view.js';
import './views/sort-view.js';
import './views/trip-event-list-view.js';
import './views/placeholder-view.js';
import './views/overlay-view.js';

import AppModel from './model/app-model.js';
import TripInfoPresenter from './presenters/trip-info-presenter.js';
import AddNewEventPresenter from './presenters/add-new-event-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import SortPresenter from './presenters/sort-presenter.js';
import TripEventListPresenter from './presenters/trip-event-list-presenter.js';
import PlaceholderPresenter from './presenters/placeholder-presenter.js';

import APIService from './services/api-service.js';
import {API_CONFIG} from './config/api.config.js';
import OverlayPresenter from './presenters/overlay-presenter.js';

const apiService = new APIService(API_CONFIG);
const appModel = new AppModel(apiService);
const body = document.querySelector('.page-body');
const header = document.querySelector('.page-header');
const mainPage = document.querySelector('.page-main');

new PlaceholderPresenter(mainPage.querySelector('placeholder-view'), appModel);

appModel.loadData().then(() => {
  new TripInfoPresenter(header.querySelector('trip-info-view'), appModel);
  new AddNewEventPresenter(header.querySelector('add-event-view'));
  new FilterPresenter(header.querySelector('filter-view'), appModel);
  new SortPresenter(mainPage.querySelector('sort-view'), appModel);
  new TripEventListPresenter(mainPage.querySelector('trip-event-list'), appModel);
  new OverlayPresenter(body.querySelector('overlay-view'), appModel);
});

