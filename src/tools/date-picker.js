import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

/**
 * @type {FlatpickrOptions}
 */
const flatpickrGlobalOptions = {
  enableTime: true,
  dateFormat: 'Z',
  altInput: true,
  altFormat: 'd/m/y H:i',
  'time_24hr': true,
  monthSelectorType: 'static',
  locale: {firstDayOfWeek: 1}
};

/**
 * @param {HTMLInputElement} element
 */
const createDatePicker = (element, options) => flatpickr(element, options);

/**
 *
 * @param {HTMLInputElement} startInputElement
 * @param {HTMLInputElement} endInputElement
 * @param {FlatpickrOptions} options
 * @return {() => void}
 */
const createPairDatePicker = (startInputElement, endInputElement, options) => {

  const startDatePicker = createDatePicker(startInputElement, options);
  const endDatePicker = createDatePicker(endInputElement, options);

  startDatePicker.set('onChange', (dates) => endDatePicker.set('minDate', dates.at(0)));
  endDatePicker.set('minDate', startDatePicker.selectedDates.at(0));

  return () => {
    startDatePicker.destroy();
    endDatePicker.destroy();
  };
};

export {createDatePicker, createPairDatePicker, flatpickrGlobalOptions};
