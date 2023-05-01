import './views/add-new-event-view.js';
import './views/trip-info-view.js';
import './views/filter-view.js';
import './views/sort-view.js';
import './views/trip-event-list-view.js';
import AppModel from './model/app-model.js';

const appModel = new AppModel();
console.log(appModel.getEventPoints());
console.log(appModel.getPoints());
console.log(appModel.getOfferGroups());


const header = document.querySelector('.page-header');
const mainPage = document.querySelector('.page-main');

/**
 * @type {TripInfoView}
 */
const tripInfoView = header.querySelector('trip-info-view');
tripInfoView.render();

/**
 * @type {AddView}
 */
const addView = header.querySelector('add-event-view');
addView.render();

/**
 * @type {FilterView}
 */
const filterView = header.querySelector('filter-view');
filterView.render();

/**
 * @type {SortView}
 */
const sortView = mainPage.querySelector('sort-view');
sortView.render();

/**
 * @type {TripEventList}
 */
const tripEventList = mainPage.querySelector('trip-event-list');
tripEventList.render();


// /**
//  * @type {TripEventModel}
//  */
// const tripEventData = new TripEventModel();
// console.log(tripEventData.getTripList());
