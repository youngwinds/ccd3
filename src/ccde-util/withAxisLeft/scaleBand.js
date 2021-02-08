function scaleBand() {
  this._axisLeftScale = d3.scaleBand();

  const {
    axisLeft: {
      key,
      scale: {
        reverse = false,
        paddingInner = 0.5,
        paddingOuter = 0.5,
      }
    }
  } = this._option;

  this._axisLeftScale
    .domain(this._data.map(d => d[key]))
    .range(reverse ? [0, this._innerHeight] : [this._innerHeight, 0])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter);

  /**
   * the interface for _axisLeftScale
   * @param {string || number} d 
   */
  this._bottomScale = (d) => +this._axisLeftScale(d);

  /**
   * the bandwith for category value
   */
  this._bandwidth = () => this.bandwidth();
}

export { scaleBand }