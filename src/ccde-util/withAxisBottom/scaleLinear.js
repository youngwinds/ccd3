function scaleLinear() {
  this._axisBottomScale = d3.scaleLinear();

  const {
    axisBottom: {
      key
    }
  } = this._option;

  this._axisBottomScale
    .domain([0, d3.max(this._data, d => d[key])])
    .range([0, this._innerHeight]);

  /**
  * the interface for _axisBottomScale
  * @param {string || number} d 
  */
  this._bottomScale = (d) => +this._axisBottomScale(d);
}

export { scaleLinear }