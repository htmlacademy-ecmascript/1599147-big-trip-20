const createSortItemTemplate = (itemName) => (`
  <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
      <label class="trip-sort__btn" for="sort-day">${itemName}</label>
    </div>
`);

export { createSortItemTemplate };
