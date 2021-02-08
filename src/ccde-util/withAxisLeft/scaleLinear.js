function scaleLinear() {
  this._axisLeftScale = d3.scaleLinear();

  const {
    axisLeft: {
      key,
      scale: {
        extent = false,
        reverse = false,
        nice = true,
      }
    }
  } = this._option;

  this._axisLeftScale
    .domain(extent ? d3.extent(this._data, d => d[key]) : [0, d3.max(this._data, d => d[key])])
    .range(reverse ? [0, this._innerHeight] : [this._innerHeight, 0]);
  nice ? this._axisLeftScale.nice() : null;
  /**
  * the interface for _axisLeftScale
  * @param {string || number} d 
  */
  this._leftScale = (d) => +this._axisLeftScale(d);
}

export { scaleLinear }