function scaleLinear() {
  this._axisBottomScale = d3.scaleLinear();

  const {
    axisBottom: {
      key,
      scale: {
        extent = false,
        reverse = false,
        nice = true
      }
    }
  } = this._option;

  this._axisBottomScale
    .domain(extent ? d3.extent(this._data, d => d[key]) : [0, d3.max(this._data, d => d[key])])
    .range(reverse ? [this._innerWidth, 0] : [0, this._innerWidth]);
  nice ? this._axisBottomScale.nice() : null;
  /**
  * the interface for _axisBottomScale
  * @param {string || number} d 
  */
  this._bottomScale = (d) => +this._axisBottomScale(d);
}

export { scaleLinear }