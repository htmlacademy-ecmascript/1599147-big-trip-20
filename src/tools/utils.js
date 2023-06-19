import {escape as escapeHtml} from 'he';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import {DURATION_FORMATS} from '../config/date-time.config.js';

dayjs.extend(durationPlugin);

class SafeHtml extends String {}

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @return {SafeHtml}
 */
function html(strings, ...values) {
  const result = strings.reduce((before, after, index) => {
    const value = values[index - 1];

    if (value === undefined) {
      return before + after;
    }

    if (Array.isArray(value) && value.every((it) => it instanceof SafeHtml)) {
      return before + value.join('') + after;
    }

    if (!(value instanceof SafeHtml)) {
      return before + escapeHtml(String(value)) + after;
    }

    return before + value + after;
  });

  return new SafeHtml(result);
}

/**
 * @param {string | dayjs.Dayjs} dateTime
 * @param {boolean} [isSimple]
 * @return {string}
 */
const formatDate = (dateTime, isSimple) => dayjs(dateTime).format(isSimple ? 'D' : 'MMM D');

/**
 * @param {string} dateTime
 * @return {string}
 */
const formatTime = (dateTime) => dayjs(dateTime).format('HH:mm');

/**
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @return {number}
 */
const getDuration = (startDateTime, endDateTime) => dayjs(endDateTime).diff(startDateTime);

/**
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @return {string}
 */
const formatDuration = (startDateTime, endDateTime) => {
  const millisecondDuration = getDuration(startDateTime, endDateTime);
  const duration = dayjs.duration(millisecondDuration);

  if (duration.days()) {
    return duration.format(DURATION_FORMATS.DURATION_DAY);
  }

  if (duration.hours()) {
    return duration.format(DURATION_FORMATS.DURATION_HOURS);
  }

  return duration.format(DURATION_FORMATS.DURATION_MINUTES);

};

/**
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @return {string}
 */
const formatRange = (startDateTime, endDateTime) => {
  const start = dayjs(startDateTime);
  const stop = dayjs(endDateTime);
  if (start.isSame(stop, 'day')) {
    return formatDate(start);
  }
  return [formatDate(start), formatDate(stop, start.isSame(stop, 'month'))].join(' — ');
};

/**
 * @param {HTMLInputElement} element
 */

export {SafeHtml, html, formatDate, formatTime, formatDuration, getDuration, formatRange };
