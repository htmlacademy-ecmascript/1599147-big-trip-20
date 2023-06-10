/**
 * @abstract
 */
export default class Model extends EventTarget {

  /**
   * @param {string} type
   * @param {any} [detail]
   */
  notify(type, detail = null) {

    const event = new CustomEvent(type, {detail});
    this.dispatchEvent(event);
  }
}
