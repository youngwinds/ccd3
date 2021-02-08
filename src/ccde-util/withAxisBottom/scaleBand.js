function scaleBand() {
  this._axisBottomScale = d3.scaleBand();

  const {
    axisBottom: {
      key
    }
  } = this._option;

  this._axisBottomScale
    .domain(this._data.map(d => d[key]))
    .range([0, this._innerHeight]);

  /**
   * the interface for _axisBottomScale
   * @param {string || number} d 
   */
  this._bottomScale = (d) => +this._axisBottomScale(d);

  /**
   * the bandwith for category value
   */
  this._bandwidth = () => this.bandwidth();
}

export { scaleBand }