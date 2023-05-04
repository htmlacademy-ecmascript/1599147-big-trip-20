import View from './view.js';
import {html} from '../tools/utils.js';

/**
 * @extends {View<EventViewState>}
 */
class CardView extends View {

  /**
   * @override
   */
  createHtml() {
    return html`
      <div class="event">
        ${this.createStartDateHtml()}
        ${this.createEventTypeIconHtml()}
        ${this.createEventDestinationHtml()}
        ${this.createScheduleHtml()}
        ${this.createEventPriceHtml()}
        ${this.createSelectedOffersHtml()}
        ${this.createFavoriteButtonHtml()}
        ${this.createOpenCardButtonHtml()}
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createStartDateHtml() {

    return html`
      <time class="event__date" datetime="${this.state.startDateTime}">${this.state.startDate}</time>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createEventTypeIconHtml() {
    const eventType = this.state.eventTypeList.find((item) => item.isSelected).value;

    return html`
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createEventDestinationHtml() {
    const eventType = this.state.eventTypeList.find((item) => item.isSelected).value;
    const pointName = this.state.pointList.find((item) => item.isSelected).name;

    return html`<h3 class="event__title">${eventType} ${pointName}</h3>`;
  }

  /**
   * @return {SafeHtml}
   */
  createScheduleHtml() {
    return html`
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${this.state.startDateTime}">${this.state.startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${this.state.endDateTime}">${this.state.endTime}</time>
        </p>
        <p class="event__duration">${this.state.duration}</p>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createEventPriceHtml() {
    return html`
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this.state.basePrice}</span>
      </p>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createSelectedOffersHtml() {
    //
    const selectedOffers = this.state.offerList.filter((item) => item.isSelected);
    // console.log(selectedOffers);
    if (!selectedOffers.length) {
      return '';
    }
    return html`
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${selectedOffers.map((item) => html`
          <li class="event__offer" >
            <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </li >
        `)}
      </ul>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createFavoriteButtonHtml() {
    return html`
      <button class="event__favorite-btn ${this.state.isFavorite ? 'event__favorite-btn--active' : '' } type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createOpenCardButtonHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }
}

customElements.define('card-view', CardView);

export default CardView;

