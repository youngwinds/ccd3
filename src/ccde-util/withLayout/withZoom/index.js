/**
 * 添加缩放
 */
import { addZoom } from './addZoom.js'

function withZoom() {
  const {
    layout: { zoom }
  } = this._option;

  if (zoom) {
    this._zoomGroup = this._svg.append('g')
      .attr('id', `${this._domId}ZoomGroup`)
      .attr('class', `zoom-group`)
    addZoom.call(this);
    return this._zoomGroup.append('g');
  } else {
    return this._svg.append('g');
  }
}


export { withZoom }