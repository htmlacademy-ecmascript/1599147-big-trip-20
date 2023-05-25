import View from './view.js';
import {html} from '../tools/utils.js';

/**
 * @extends {View<EventViewState>}
 */
class EventEditorView extends View {

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInput);
  }

  connectedCallback() {
    document.addEventListener('keydown', this);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this);
  }

  /**
   *  @param {MouseEvent & {target: Element}} evt
  */
  handleClick(evt) {
    if (evt.target.closest('.event__rollup-btn')) {
      this.notify('closeCard');
    }

  }

  /**
   * @param {KeyboardEvent} evt
   */
  handleEvent(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.notify('closeCard');
    }
  }

  /**
   * @param {InputEvent} evt
   */
  handleInput(evt) {
    this.notify('edit', evt.target);
  }

  /**
   * @override
   */
  createHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${this.createEventTypeFieldHtml()}
          ${this.createDestinationHtml()}
          ${this.createScheduleFieldHtml()}
          ${this.createPriceFieldHtml()}
          ${this.createSubmitHtml()}
          ${this.createResetHtml()}
          ${this.createCloseHtml()}
        </header>

        <section class="event__details">
          ${this.createAvailableOffersListHtml()}
          ${this.createDestinationDetailsHtml()}

        </section>
      </form>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createEventTypeFieldHtml() {
    const typeList = this.state.eventTypeList;
    const checkedItem = typeList.find((item) => item.isSelected);
    return html`
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedItem.value}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${typeList.map((item) => html`
              <div class="event__type-item">
                <input id="event-type-${item.value}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.value}" ${item.isSelected ? 'checked' : ''}>
                <label class="event__type-label  event__type-label--${item.value}" for="event-type-${item.value}-1">${item.description}</label>
              </div>
            `)}

          </fieldset>
        </div>
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createDestinationHtml() {
    const checkedItem = this.state.eventTypeList.find((item) => item.isSelected);
    const eventPointList = this.state.pointList;
    const currentPoint = eventPointList.find((item) => item.isSelected);

    return html`
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${checkedItem.value}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentPoint?.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${eventPointList.map((item) => html`<option value="${item.name}"></option>`)}
      </datalist>
    </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createScheduleFieldHtml() {
    return html`
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this.state.startDateTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this.state.endDateTime}">
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createPriceFieldHtml() {
    return html`
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this.state.basePrice}">
      </div>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createSubmitHtml() {
    return html`<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>`;
  }

  /**
   * @return {SafeHtml}
   */
  createResetHtml() {
    return html`<button class="event__reset-btn" type="reset">Delete</button>`;
  }

  /**
   * @return {SafeHtml}
   */
  createCloseHtml() {
    return html`
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createAvailableOffersListHtml() {
    const offerList = this.state.offerList;

    if (!offerList.length) {
      return '';
    }
    return html`
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offerList.map((item) => html`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="${item.id}" type="checkbox" name="event-offer" ${item.isSelected ? 'checked' : ''}>
              <label class="event__offer-label" for="${item.id}">
                <span class="event__offer-title">${item.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${item.price}</span>
              </label>
            </div>
          `)}
        </div>
      </section>
    `;
  }

  /**
   * @return {SafeHtml}
   */
  createDestinationDetailsHtml() {
    const currentPoint = this.state.pointList.find((item) => item.isSelected);

    return html`
      <section class="event__section  event__section--destination" ${currentPoint ? '' : 'hidden'}>
        ${currentPoint?.pictures.length ? html`
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${currentPoint?.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${currentPoint.pictures.map((item) => html`
                <img class="event__photo" src="${item.src}" alt="${item.description}">
              `)}
            </div>
          </div>
          `
    : ''}
      </section>
    `;
  }

  renderDestinationDetails() {
    if (this.querySelector('.event__section--destination')) {
      this.render('.event__section--destination', this.createDestinationDetailsHtml());
    } else {
      this.render();
    }
  }
}

customElements.define('event-editor-view', EventEditorView);

export default EventEditorView;

