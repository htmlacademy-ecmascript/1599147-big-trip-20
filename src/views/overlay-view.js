import './overlay-view.css';
import View from './view.js';

/**
 * @extends {View<OverlayViewState>}
 * @implements {EventListenerObject}
 */
class OverlayView extends View {
  constructor() {
    super();

    this.classList.add('overlay');
  }

  /**
   * @override
   */
  render() {
    if (this.state.isActive) {
      this.classList.add('overlay--on');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this);
    } else {
      this.classList.remove('overlay--on');
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', this);

    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define('overlay-view', OverlayView);

export default OverlayView;

